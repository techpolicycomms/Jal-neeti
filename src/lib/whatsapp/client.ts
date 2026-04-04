/**
 * Gupshup WhatsApp Business API client
 * Handles sending text, template, and interactive messages
 */

const GUPSHUP_API = 'https://api.gupshup.io/wa/api/v1/msg';

function getConfig() {
  const apiKey = process.env.GUPSHUP_API_KEY;
  const appName = process.env.GUPSHUP_APP_NAME;
  const sourcePhone = process.env.GUPSHUP_SOURCE_PHONE;
  if (!apiKey || !appName || !sourcePhone) {
    throw new Error('Missing Gupshup configuration. Set GUPSHUP_API_KEY, GUPSHUP_APP_NAME, GUPSHUP_SOURCE_PHONE.');
  }
  return { apiKey, appName, sourcePhone };
}

/** Send a plain text message */
export async function sendText(phone: string, text: string): Promise<string> {
  const { apiKey, sourcePhone } = getConfig();

  const body = new URLSearchParams({
    channel: 'whatsapp',
    source: sourcePhone,
    destination: phone,
    'src.name': process.env.GUPSHUP_APP_NAME!,
    message: JSON.stringify({ type: 'text', text }),
  });

  const res = await fetch(GUPSHUP_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey: apiKey,
    },
    body: body.toString(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Gupshup sendText failed: ${JSON.stringify(data)}`);
  }
  return data.messageId ?? '';
}

/** Send an HSM template message (for initiating conversations outside 24h window) */
export async function sendTemplate(
  phone: string,
  templateId: string,
  params: string[]
): Promise<string> {
  const { apiKey, sourcePhone } = getConfig();

  const body = new URLSearchParams({
    channel: 'whatsapp',
    source: sourcePhone,
    destination: phone,
    'src.name': process.env.GUPSHUP_APP_NAME!,
    template: JSON.stringify({
      id: templateId,
      params,
    }),
  });

  const res = await fetch(GUPSHUP_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey: apiKey,
    },
    body: body.toString(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Gupshup sendTemplate failed: ${JSON.stringify(data)}`);
  }
  return data.messageId ?? '';
}

/** Send an interactive button message */
export async function sendInteractiveButtons(
  phone: string,
  bodyText: string,
  buttons: { id: string; title: string }[]
): Promise<string> {
  const { apiKey, sourcePhone } = getConfig();

  const message = {
    type: 'quick_reply',
    content: {
      type: 'text',
      text: bodyText,
    },
    options: buttons.map((b) => ({
      type: 'text',
      title: b.title,
      postbackText: b.id,
    })),
  };

  const body = new URLSearchParams({
    channel: 'whatsapp',
    source: sourcePhone,
    destination: phone,
    'src.name': process.env.GUPSHUP_APP_NAME!,
    message: JSON.stringify(message),
  });

  const res = await fetch(GUPSHUP_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey: apiKey,
    },
    body: body.toString(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Gupshup sendInteractiveButtons failed: ${JSON.stringify(data)}`);
  }
  return data.messageId ?? '';
}

/** Verify Gupshup webhook signature (HMAC-SHA256) */
export async function verifyWebhookSignature(
  rawBody: string,
  signature: string
): Promise<boolean> {
  const secret = process.env.GUPSHUP_WEBHOOK_SECRET;
  if (!secret) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody));
  const computed = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return computed === signature;
}
