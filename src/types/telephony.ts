/** Exotel call initiation request */
export interface ExotelCallRequest {
  from: string;          // caller ID (your Exotel virtual number)
  to: string;            // customer phone
  callerId: string;      // Exotel caller ID
  statusCallback: string;
  streamUrl?: string;    // WebSocket URL for audio streaming
}

/** Exotel call status callback */
export interface ExotelStatusCallback {
  CallSid: string;
  Status: ExotelCallStatus;
  From: string;
  To: string;
  Direction: string;
  Duration?: string;
  RecordingUrl?: string;
  StartTime?: string;
  EndTime?: string;
  DateCreated?: string;
}

export type ExotelCallStatus =
  | 'ringing'
  | 'in-progress'
  | 'completed'
  | 'failed'
  | 'busy'
  | 'no-answer'
  | 'canceled';

/** Audio bridge session state */
export interface AudioBridgeSession {
  callId: string;
  callSid: string;
  personaplexSessionId: string | null;
  startedAt: Date;
  status: 'connecting' | 'active' | 'ended';
}
