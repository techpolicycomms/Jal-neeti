import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ScheduleCallRequest } from '@/types/scheduling';

/** POST: Schedule a new call */
export async function POST(request: Request) {
  try {
    const body: ScheduleCallRequest = await request.json();

    if (!body.customer_phone || !body.scheduled_at) {
      return NextResponse.json(
        { error: 'Missing required fields: customer_phone, scheduled_at' },
        { status: 400 }
      );
    }

    // Validate Indian phone number (10 digits starting with 6-9, or E.164 +91)
    const phoneClean = body.customer_phone.replace(/\s+/g, '');
    const validPhone = /^(\+91)?[6-9]\d{9}$/.test(phoneClean);
    if (!validPhone) {
      return NextResponse.json(
        { error: 'Invalid Indian phone number. Use format: +919876543210 or 9876543210' },
        { status: 400 }
      );
    }

    // Validate scheduled time is in the future and within business hours (9AM-7PM IST)
    const scheduledDate = new Date(body.scheduled_at);
    if (scheduledDate <= new Date()) {
      return NextResponse.json(
        { error: 'Scheduled time must be in the future' },
        { status: 400 }
      );
    }

    // Convert to IST and check business hours
    const istHour = new Date(
      scheduledDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    ).getHours();
    if (istHour < 9 || istHour >= 19) {
      return NextResponse.json(
        { error: 'Calls can only be scheduled between 9 AM and 7 PM IST' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('scheduled_calls')
      .insert({
        customer_phone: phoneClean.startsWith('+91') ? phoneClean : `+91${phoneClean}`,
        customer_name: body.customer_name,
        scheduled_at: body.scheduled_at,
        timezone: body.timezone ?? 'Asia/Kolkata',
        purpose: body.purpose ?? 'product_inquiry',
        language: body.language ?? 'en',
        personaplex_persona: body.persona ?? 'jalneeti-water-advisor',
        conversation_id: body.conversation_id,
        status: 'call_pending',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, call: data }, { status: 201 });
  } catch (error) {
    console.error('[Schedule Call] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to schedule call' },
      { status: 500 }
    );
  }
}

/** GET: List scheduled calls */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const phone = searchParams.get('phone');

    const supabase = await createClient();

    let query = supabase
      .from('scheduled_calls')
      .select('*')
      .order('scheduled_at', { ascending: true });

    if (status) query = query.eq('status', status);
    if (phone) query = query.eq('customer_phone', phone);

    const { data, error } = await query.limit(50);
    if (error) throw error;

    return NextResponse.json({ calls: data });
  } catch (error) {
    console.error('[List Calls] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list calls' },
      { status: 500 }
    );
  }
}
