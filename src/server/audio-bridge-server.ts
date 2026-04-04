/**
 * Standalone WebSocket server for audio bridging.
 * Runs alongside the Next.js app on a persistent Node.js host.
 *
 * Exotel connects here when a call is answered, streaming bidirectional audio.
 * This server bridges each connection to NVIDIA Personaplex.
 *
 * Usage:
 *   npx tsx src/server/audio-bridge-server.ts
 *
 * Environment:
 *   AUDIO_BRIDGE_PORT (default: 8999)
 *   PERSONAPLEX_ENDPOINT, PERSONAPLEX_API_KEY
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (for updating call records)
 */

import { WebSocketServer, WebSocket } from 'ws';
import { handleExotelStream, type BridgeSession } from '../lib/telephony/audio-bridge';

const PORT = parseInt(process.env.AUDIO_BRIDGE_PORT ?? '8999');

const wss = new WebSocketServer({ port: PORT });

console.log(`[AudioBridge] WebSocket server listening on port ${PORT}`);

wss.on('connection', (ws: WebSocket, req) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  const callId = url.searchParams.get('callId') ?? 'unknown';
  const persona = url.searchParams.get('persona') ?? 'jalneeti-water-advisor';
  const language = url.searchParams.get('language') ?? 'en';
  const customerName = url.searchParams.get('customerName') ?? undefined;

  console.log(`[AudioBridge] New connection for call: ${callId}`);

  const session: BridgeSession = {
    callId,
    callSid: url.searchParams.get('callSid') ?? '',
    persona,
    language,
    customerName,
    onTranscript: (role, text) => {
      console.log(`[AudioBridge] [${callId}] ${role}: ${text}`);
    },
    onEnded: (summary) => {
      console.log(`[AudioBridge] [${callId}] Call ended. Duration: ${summary.duration}s, Turns: ${summary.transcript.length}`);
      // In production, POST the transcript/summary back to the Next.js API
      // to update the scheduled_calls record.
    },
  };

  handleExotelStream(ws, session).catch((err) => {
    console.error(`[AudioBridge] Session error for call ${callId}:`, err);
  });
});

wss.on('error', (err) => {
  console.error('[AudioBridge] Server error:', err);
});

process.on('SIGTERM', () => {
  console.log('[AudioBridge] Shutting down...');
  wss.close();
  process.exit(0);
});
