-- ═══════════════════════════════════════
-- WhatsApp + Telephony + Voice Scheduling
-- Jal Neeti Technologies
-- ═══════════════════════════════════════

-- New ref_status entries for the scheduling domain
INSERT INTO ref_status (code, domain, label, sort_order, color) VALUES
  ('call_pending',     'scheduled_call', 'Pending',     1, '#3B82F6'),
  ('call_confirmed',   'scheduled_call', 'Confirmed',   2, '#8B5CF6'),
  ('call_in_progress', 'scheduled_call', 'In Progress', 3, '#F59E0B'),
  ('call_completed',   'scheduled_call', 'Completed',   4, '#22C55E'),
  ('call_failed',      'scheduled_call', 'Failed',      5, '#EF4444'),
  ('call_cancelled',   'scheduled_call', 'Cancelled',   6, '#94A3B8'),
  ('call_no_answer',   'scheduled_call', 'No Answer',   7, '#EF4444');

-- ═══════════════════════════════════════
-- WHATSAPP CONVERSATIONS
-- Tracks scheduling FSM state per phone number
-- ═══════════════════════════════════════
CREATE TABLE whatsapp_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  lead_id UUID REFERENCES leads(id),
  customer_name TEXT,
  language TEXT DEFAULT 'en',
  state TEXT NOT NULL DEFAULT 'idle',
  context JSONB DEFAULT '{}',
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_wa_conv_phone ON whatsapp_conversations(phone);

-- ═══════════════════════════════════════
-- WHATSAPP MESSAGE LOG
-- Audit trail for all messages
-- ═══════════════════════════════════════
CREATE TABLE whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES whatsapp_conversations(id),
  direction TEXT NOT NULL,
  message_type TEXT NOT NULL,
  content TEXT,
  template_name TEXT,
  provider_message_id TEXT,
  status TEXT DEFAULT 'sent',
  raw_payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_wa_msg_conv ON whatsapp_messages(conversation_id, created_at DESC);

-- ═══════════════════════════════════════
-- SCHEDULED CALLS
-- Core scheduling table
-- ═══════════════════════════════════════
CREATE TABLE scheduled_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES whatsapp_conversations(id),
  lead_id UUID REFERENCES leads(id),
  customer_phone TEXT NOT NULL,
  customer_name TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  timezone TEXT DEFAULT 'Asia/Kolkata',
  purpose TEXT DEFAULT 'product_inquiry',
  language TEXT DEFAULT 'en',
  personaplex_persona TEXT DEFAULT 'jalneeti-water-advisor',
  attempt_count INT DEFAULT 0,
  max_attempts INT DEFAULT 3,
  telephony_provider TEXT DEFAULT 'exotel',
  telephony_call_sid TEXT,
  call_duration_seconds INT,
  recording_url TEXT,
  transcript JSONB,
  summary TEXT,
  outcome TEXT,
  status TEXT NOT NULL DEFAULT 'call_pending' REFERENCES ref_status(code),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  failure_reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_sc_scheduled ON scheduled_calls(scheduled_at) WHERE status = 'call_pending';
CREATE INDEX idx_sc_phone ON scheduled_calls(customer_phone);
CREATE INDEX idx_sc_status ON scheduled_calls(status);

-- ═══════════════════════════════════════
-- CALL EVENTS LOG
-- Telephony lifecycle events for debugging
-- ═══════════════════════════════════════
CREATE TABLE call_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES scheduled_calls(id),
  event_type TEXT NOT NULL,
  provider TEXT,
  provider_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_ce_call ON call_events(call_id, created_at);
