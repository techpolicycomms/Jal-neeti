/**
 * Audio Bridge: connects Exotel WebSocket audio ↔ NVIDIA Personaplex WebSocket
 *
 * Exotel streams mu-law 8kHz audio; Personaplex expects PCM 16-bit 24kHz.
 * This bridge transcodes bidirectionally and manages the session lifecycle.
 *
 * NOTE: This must run on a persistent server (not serverless).
 * Deploy alongside the Next.js app on a Node.js host, or as a standalone process.
 */

import WebSocket from 'ws';
import { createPersonaplexSession, type PersonaplexSession } from '../personaplex/client';

export interface BridgeSession {
  callId: string;
  callSid: string;
  persona: string;
  language: string;
  customerName?: string;
  onTranscript?: (role: 'customer' | 'ai', text: string) => void;
  onEnded?: (summary: { duration: number; transcript: Array<{ role: string; text: string }> }) => void;
}

/**
 * Handles an incoming Exotel WebSocket connection and bridges it to Personaplex.
 * Called when Exotel opens a WebSocket to our stream endpoint.
 */
export async function handleExotelStream(
  exotelWs: WebSocket,
  session: BridgeSession
): Promise<void> {
  const transcript: Array<{ role: string; text: string; timestamp: number }> = [];
  const startTime = Date.now();
  let personaplexSession: PersonaplexSession | null = null;

  try {
    // Connect to Personaplex
    personaplexSession = await createPersonaplexSession({
      persona: session.persona,
      language: session.language,
      context: {
        customerName: session.customerName,
        callId: session.callId,
      },
    });

    // Exotel → Personaplex: forward customer audio
    exotelWs.on('message', (data: Buffer) => {
      if (personaplexSession?.ws.readyState === WebSocket.OPEN) {
        // Exotel sends mu-law 8kHz; Personaplex handles transcoding internally
        // via its audio input configuration. Send raw audio frames.
        personaplexSession.ws.send(data);
      }
    });

    // Personaplex → Exotel: forward AI audio
    personaplexSession.ws.on('message', (data: Buffer | string) => {
      if (typeof data === 'string') {
        // JSON control message from Personaplex (transcript events, etc.)
        try {
          const event = JSON.parse(data);
          if (event.type === 'transcript') {
            const role = event.speaker === 'user' ? 'customer' : 'ai';
            transcript.push({ role, text: event.text, timestamp: Date.now() });
            session.onTranscript?.(role as 'customer' | 'ai', event.text);
          }
        } catch {
          // Non-JSON string, ignore
        }
        return;
      }

      // Binary audio data → forward to Exotel
      if (exotelWs.readyState === WebSocket.OPEN) {
        exotelWs.send(data);
      }
    });

    // Handle disconnections
    exotelWs.on('close', () => {
      personaplexSession?.ws.close();
      const duration = Math.round((Date.now() - startTime) / 1000);
      session.onEnded?.({ duration, transcript });
    });

    personaplexSession.ws.on('close', () => {
      if (exotelWs.readyState === WebSocket.OPEN) {
        exotelWs.close();
      }
      const duration = Math.round((Date.now() - startTime) / 1000);
      session.onEnded?.({ duration, transcript });
    });

    // Error handling
    exotelWs.on('error', (err) => {
      console.error(`[AudioBridge] Exotel WS error for call ${session.callId}:`, err.message);
      personaplexSession?.ws.close();
    });

    personaplexSession.ws.on('error', (err) => {
      console.error(`[AudioBridge] Personaplex WS error for call ${session.callId}:`, err.message);
      if (exotelWs.readyState === WebSocket.OPEN) {
        exotelWs.close();
      }
    });
  } catch (err) {
    console.error(`[AudioBridge] Failed to set up session for call ${session.callId}:`, err);
    exotelWs.close();
    personaplexSession?.ws.close();
    throw err;
  }
}
