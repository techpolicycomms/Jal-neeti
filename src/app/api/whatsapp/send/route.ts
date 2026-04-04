import { NextResponse } from 'next/server';
import { sendText, sendTemplate } from '@/lib/whatsapp/client';

/**
 * Internal API for sending WhatsApp messages programmatically.
 * Used by the scheduling system to send reminders and post-call messages.
 */
export async function POST(request: Request) {
  try {
    const { phone, text, template, params } = await request.json();

    // Basic auth check — only allow internal calls
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!phone) {
      return NextResponse.json({ error: 'Missing phone number' }, { status: 400 });
    }

    let messageId: string;
    if (template) {
      messageId = await sendTemplate(phone, template, params ?? []);
    } else if (text) {
      messageId = await sendText(phone, text);
    } else {
      return NextResponse.json({ error: 'Missing text or template' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, messageId });
  } catch (error) {
    console.error('[WhatsApp Send] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send' },
      { status: 500 }
    );
  }
}
