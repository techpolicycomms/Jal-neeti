import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { initiateCall } from '@/lib/telephony/exotel-client';

/**
 * Cron trigger endpoint: finds pending calls that are due and initiates them via Exotel.
 * Should be called every minute by an external cron (Vercel Cron, GitHub Actions, etc.).
 *
 * Protected by CRON_SECRET bearer token.
 */
export async function POST(request: Request) {
  try {
    // Authenticate
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();

    // Find calls due in the next 2 minutes
    const advanceMinutes = parseInt(process.env.CALL_ADVANCE_MINUTES ?? '2');
    const cutoff = new Date(Date.now() + advanceMinutes * 60 * 1000).toISOString();

    const { data: pendingCalls, error } = await supabase
      .from('scheduled_calls')
      .select('*')
      .eq('status', 'call_pending')
      .lte('scheduled_at', cutoff)
      .order('scheduled_at', { ascending: true })
      .limit(10);

    if (error) throw error;
    if (!pendingCalls || pendingCalls.length === 0) {
      return NextResponse.json({ ok: true, triggered: 0 });
    }

    const statusCallbackUrl = process.env.EXOTEL_STATUS_CALLBACK_URL
      ?? `${process.env.NEXT_PUBLIC_BASE_URL}/api/telephony/webhook`;

    const streamUrl = process.env.AUDIO_BRIDGE_STREAM_URL; // e.g. wss://audio.yourapp.com/stream

    const results = [];

    for (const call of pendingCalls) {
      try {
        const { callSid, status } = await initiateCall({
          to: call.customer_phone,
          statusCallbackUrl,
          streamUrl: streamUrl ? `${streamUrl}?callId=${call.id}` : undefined,
          customField: JSON.stringify({
            callId: call.id,
            persona: call.personaplex_persona,
            language: call.language,
            customerName: call.customer_name,
          }),
        });

        // Update the scheduled call with the provider's call ID
        await supabase
          .from('scheduled_calls')
          .update({
            telephony_call_sid: callSid,
            status: 'call_in_progress',
            attempt_count: call.attempt_count + 1,
            updated_at: new Date().toISOString(),
          })
          .eq('id', call.id);

        // Log initiation event
        await supabase.from('call_events').insert({
          call_id: call.id,
          event_type: 'initiated',
          provider: 'exotel',
          provider_data: { callSid, status },
        });

        results.push({ callId: call.id, callSid, status: 'initiated' });
      } catch (err) {
        console.error(`[Trigger] Failed to initiate call ${call.id}:`, err);

        await supabase
          .from('scheduled_calls')
          .update({
            status: 'call_failed',
            failure_reason: err instanceof Error ? err.message : 'Initiation failed',
            updated_at: new Date().toISOString(),
          })
          .eq('id', call.id);

        results.push({ callId: call.id, status: 'failed', error: err instanceof Error ? err.message : 'Unknown' });
      }
    }

    return NextResponse.json({ ok: true, triggered: results.length, results });
  } catch (error) {
    console.error('[Trigger] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Trigger failed' },
      { status: 500 }
    );
  }
}
