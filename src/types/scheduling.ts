/** Scheduled call row (mirrors DB) */
export interface ScheduledCall {
  id: string;
  conversation_id: string | null;
  lead_id: string | null;
  customer_phone: string;
  customer_name: string | null;
  scheduled_at: string;
  timezone: string;
  purpose: CallPurpose;
  language: string;
  personaplex_persona: string;
  attempt_count: number;
  max_attempts: number;
  telephony_provider: string;
  telephony_call_sid: string | null;
  call_duration_seconds: number | null;
  recording_url: string | null;
  transcript: Record<string, unknown> | null;
  summary: string | null;
  outcome: CallOutcome | null;
  status: CallStatus;
  started_at: string | null;
  ended_at: string | null;
  failure_reason: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export type CallStatus =
  | 'call_pending'
  | 'call_confirmed'
  | 'call_in_progress'
  | 'call_completed'
  | 'call_failed'
  | 'call_cancelled'
  | 'call_no_answer';

export type CallPurpose =
  | 'product_inquiry'
  | 'support'
  | 'followup'
  | 'general';

export type CallOutcome =
  | 'interested'
  | 'not_interested'
  | 'callback_requested'
  | 'info_sent'
  | 'site_visit_scheduled';

/** Request to schedule a call */
export interface ScheduleCallRequest {
  customer_phone: string;
  customer_name?: string;
  scheduled_at: string;   // ISO 8601
  timezone?: string;
  purpose?: CallPurpose;
  language?: string;
  persona?: string;
  conversation_id?: string;
}
