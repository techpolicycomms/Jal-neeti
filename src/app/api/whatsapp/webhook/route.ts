import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyWebhookSignature, sendText } from '@/lib/whatsapp/client';
import { handleMessage } from '@/lib/whatsapp/conversation-handler';
import type { GupshupInboundPayload, ConversationState } from '@/types/whatsapp';

/** GET: Gupshup webhook verification */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get('hub.challenge') ?? searchParams.get('challenge') ?? '';
  return new Response(challenge, { status: 200 });
}

/** POST: Handle inbound WhatsApp messages */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    // Verify webhook signature if secret is configured
    const signature = request.headers.get('x-gupshup-signature') ?? '';
    if (process.env.GUPSHUP_WEBHOOK_SECRET) {
      const valid = await verifyWebhookSignature(rawBody, signature);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload: GupshupInboundPayload = JSON.parse(rawBody);

    // Only process actual messages (not status events)
    if (payload.type !== 'message') {
      return NextResponse.json({ ok: true });
    }

    const senderPhone = payload.payload.sender.phone;
    const senderName = payload.payload.sender.name;
    const messageText = payload.payload.payload.text ?? payload.payload.payload.title ?? '';

    if (!messageText) {
      return NextResponse.json({ ok: true });
    }

    const supabase = await createClient();

    // Look up or create conversation
    const { data: existing } = await supabase
      .from('whatsapp_conversations')
      .select('*')
      .eq('phone', senderPhone)
      .single();

    let conversation = existing;
    if (!conversation) {
      const { data: created, error } = await supabase
        .from('whatsapp_conversations')
        .insert({
          phone: senderPhone,
          customer_name: senderName,
          state: 'idle',
          context: {},
          last_message_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      conversation = created;
    }

    // Log inbound message
    await supabase.from('whatsapp_messages').insert({
      conversation_id: conversation.id,
      direction: 'inbound',
      message_type: payload.payload.type,
      content: messageText,
      provider_message_id: payload.payload.id,
      raw_payload: payload as unknown as Record<string, unknown>,
    });

    // Run FSM
    const language = (conversation.language ?? 'en') as 'en' | 'hi';
    const result = handleMessage(
      conversation.state as ConversationState,
      messageText,
      conversation.context as Record<string, unknown>,
      language
    );

    // Process side effects
    for (const effect of result.sideEffects) {
      if (effect.type === 'schedule_call') {
        const scheduledAt = effect.data.scheduledAt as string;

        // Create or find lead
        let leadId = conversation.lead_id;
        if (!leadId) {
          const { data: lead } = await supabase
            .from('leads')
            .insert({
              full_name: senderName || 'WhatsApp User',
              email: `${senderPhone}@whatsapp.placeholder`,
              phone: senderPhone,
              source: 'whatsapp',
              lead_type: 'customer',
              status: 'lead_new',
            })
            .select('id')
            .single();
          leadId = lead?.id ?? null;
        }

        // Create scheduled call
        await supabase.from('scheduled_calls').insert({
          conversation_id: conversation.id,
          lead_id: leadId,
          customer_phone: senderPhone,
          customer_name: senderName,
          scheduled_at: scheduledAt,
          language,
          status: 'call_pending',
        });

        // Update lead link on conversation
        if (leadId) {
          await supabase
            .from('whatsapp_conversations')
            .update({ lead_id: leadId })
            .eq('id', conversation.id);
        }
      }

      if (effect.type === 'cancel_call') {
        await supabase
          .from('scheduled_calls')
          .update({ status: 'call_cancelled' })
          .eq('conversation_id', conversation.id)
          .eq('status', 'call_pending');
      }
    }

    // Update conversation state
    await supabase
      .from('whatsapp_conversations')
      .update({
        state: result.newState,
        context: result.newContext,
        last_message_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', conversation.id);

    // Send responses
    for (const responseText of result.responses) {
      const messageId = await sendText(senderPhone, responseText);

      // Log outbound message
      await supabase.from('whatsapp_messages').insert({
        conversation_id: conversation.id,
        direction: 'outbound',
        message_type: 'text',
        content: responseText,
        provider_message_id: messageId,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[WhatsApp Webhook] Error:', error);
    // Return 200 to prevent Gupshup retries on server errors
    return NextResponse.json({ ok: true });
  }
}
