/**
 * NVIDIA Personaplex speech-to-speech client
 * Establishes WebSocket sessions for real-time conversational AI
 */

import WebSocket from 'ws';
import { getPersona } from './personas';

export interface PersonaplexSession {
  ws: WebSocket;
  sessionId: string;
}

interface SessionConfig {
  persona: string;
  language: string;
  context: {
    customerName?: string;
    callId: string;
  };
}

function getConfig() {
  const endpoint = process.env.PERSONAPLEX_ENDPOINT;
  const apiKey = process.env.PERSONAPLEX_API_KEY;
  if (!endpoint || !apiKey) {
    throw new Error('Missing Personaplex configuration. Set PERSONAPLEX_ENDPOINT and PERSONAPLEX_API_KEY.');
  }
  return { endpoint, apiKey };
}

/**
 * Create a new Personaplex speech-to-speech session.
 * Returns a WebSocket that accepts audio input and emits audio output + transcript events.
 */
export async function createPersonaplexSession(config: SessionConfig): Promise<PersonaplexSession> {
  const { endpoint, apiKey } = getConfig();
  const persona = getPersona(config.persona);

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'X-Session-Id': config.context.callId,
      },
    });

    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error('Personaplex connection timed out'));
    }, 10_000);

    ws.on('open', () => {
      clearTimeout(timeout);

      // Send session configuration
      ws.send(JSON.stringify({
        type: 'session_config',
        persona: {
          id: persona.id,
          voice: persona.voice,
          system_prompt: persona.systemPrompt,
        },
        audio: {
          input_format: 'mulaw',
          input_sample_rate: 8000,
          output_format: 'mulaw',
          output_sample_rate: 8000,
        },
        language: config.language,
        context: {
          customer_name: config.context.customerName ?? 'Customer',
          domain: 'water_treatment',
          product: 'JalBox',
        },
      }));

      resolve({
        ws,
        sessionId: config.context.callId,
      });
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}
