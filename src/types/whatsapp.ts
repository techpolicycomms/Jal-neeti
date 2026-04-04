/** Gupshup inbound webhook payload */
export interface GupshupInboundPayload {
  app: string;
  timestamp: number;
  version: number;
  type: 'message' | 'message-event';
  payload: {
    id: string;
    source: string;       // sender phone
    destination: string;  // your WABA number
    type: 'text' | 'image' | 'interactive' | 'button_reply' | 'list_reply';
    payload: {
      text?: string;
      title?: string;     // for button_reply
      id?: string;        // for interactive replies
    };
    sender: {
      phone: string;
      name: string;
      country_code: string;
    };
    context?: {
      id: string;         // quoted message ID
    };
  };
}

/** Gupshup delivery/read status event */
export interface GupshupStatusEvent {
  app: string;
  timestamp: number;
  version: number;
  type: 'message-event';
  payload: {
    id: string;
    destination: string;
    type: 'sent' | 'delivered' | 'read' | 'failed' | 'enqueued';
    payload?: {
      code?: number;
      reason?: string;
    };
  };
}

/** Conversation FSM states */
export type ConversationState =
  | 'idle'
  | 'awaiting_intent'
  | 'awaiting_date'
  | 'awaiting_time'
  | 'confirming'
  | 'scheduled';

/** Side effects produced by the FSM */
export interface FSMSideEffect {
  type: 'schedule_call' | 'cancel_call' | 'create_lead';
  data: Record<string, unknown>;
}

/** Result of FSM transition */
export interface FSMResult {
  newState: ConversationState;
  responses: string[];
  newContext: Record<string, unknown>;
  sideEffects: FSMSideEffect[];
}

/** WhatsApp conversation row (mirrors DB) */
export interface WhatsAppConversation {
  id: string;
  phone: string;
  lead_id: string | null;
  customer_name: string | null;
  language: string;
  state: ConversationState;
  context: Record<string, unknown>;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}
