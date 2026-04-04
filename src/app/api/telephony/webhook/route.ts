import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ExotelStatusCallback } from '@/types/telephony';

/**
 * Exotel status callback webhook.
 * Receives call lifecycle events and updates scheduled_calls accordingly.
 */
export async function POST(request: Request) {
  try {
    const body: ExotelStatusCallback = await request.json();
    const { CallSid, Status, Duration, RecordingUrl, StartTime, EndTime } = body;

    if (!CallSid) {
      return NextResponse.json({ error: 'Missing CallSid' }, { status: 400 });
    }

    const supabase = await createClient();

    // Find the scheduled call by telephony_call_sid
    const { data: call } = await supabase
      .from('scheduled_calls')
      .select('id, attempt_count, max_attempts, conversation_id, customer_phone')
      .eq('telephony_call_sid', CallSid)
      .single();

    if (!call) {
      console.warn(`[Telephony Webhook] No scheduled_call found for CallSid: ${CallSid}`);
      return NextResponse.json({ ok: true });
    }

    // Log the event
    await supabase.from('call_events').insert({
      call_id: call.id,
      event_type: Status,
      provider: 'exotel',
      provider_data: body as unknown as Record<string, unknown>,
    });

    // Map Exotel status to our status
    const statusMap: Record<string, string> = {
      'ringing': 'call_in_progress',
      'in-progress': 'call_in_progress',
      'completed': 'call_completed',
      'failed': 'call_failed',
      'busy': 'call_no_answer',
      'no-answer': 'call_no_answer',
      'canceled': 'call_cancelled',
    };

    const newStatus = statusMap[Status] ?? 'call_failed';

    const updates: Record<string, unknown> = {
      status: newStatus,
      updated_at: new Date().toISOString(),
    };

    if (Status === 'completed') {
      updates.call_duration_seconds = Duration ? parseInt(Duration) : null;
      updates.recording_url = RecordingUrl ?? null;
      updates.ended_at = EndTime ?? new Date().toISOString();

      // Update lead last_contacted_at
      const { data: callData } = await supabase
        .from('scheduled_calls')
        .select('lead_id')
        .eq('id', call.id)
        .single();

      if (callData?.lead_id) {
        await supabase
          .from('leads')
          .update({ last_contacted_at: new Date().toISOString() })
          .eq('id', callData.lead_id);
      }
    }

    if (Status === 'in-progress') {
      updates.started_at = StartTime ?? new Date().toISOString();
    }

    // Handle retry logic for failed/no-answer
    if (newStatus === 'call_failed' || newStatus === 'call_no_answer') {
      if (call.attempt_count < call.max_attempts) {
        // Schedule a retry in 30 minutes
        const retryAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
        await supabase.from('scheduled_calls').insert({
          conversation_id: call.conversation_id,
          customer_phone: call.customer_phone,
          scheduled_at: retryAt,
          attempt_count: call.attempt_count + 1,
          max_attempts: call.max_attempts,
          status: 'call_pending',
          metadata: { retry_of: call.id },
        });
      }
      updates.failure_reason = Status === 'no-answer' ? 'Customer did not answer' : `Call failed with status: ${Status}`;
    }

    await supabase
      .from('scheduled_calls')
      .update(updates)
      .eq('id', call.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Telephony Webhook] Error:', error);
    return NextResponse.json({ ok: true });
  }
}
