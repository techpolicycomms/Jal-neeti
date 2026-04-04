/**
 * WhatsApp scheduling conversation FSM
 * Pure function: (state, message, context) → (newState, responses, newContext, sideEffects)
 */

import type { ConversationState, FSMResult, FSMSideEffect } from '@/types/whatsapp';
import { getMessage, getParameterizedMessage } from './templates';

type Context = Record<string, unknown>;

/** Attempt to parse a date from natural language (English/Hindi basics) */
function parseDate(text: string): { date: string; display: string } | null {
  const lower = text.toLowerCase().trim();
  const now = new Date();

  // "tomorrow" / "kal"
  if (lower === 'tomorrow' || lower === 'kal') {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    return { date: d.toISOString().split('T')[0], display: formatDateDisplay(d) };
  }

  // "day after tomorrow" / "parson"
  if (lower.includes('day after') || lower === 'parson') {
    const d = new Date(now);
    d.setDate(d.getDate() + 2);
    return { date: d.toISOString().split('T')[0], display: formatDateDisplay(d) };
  }

  // "next monday", "next tuesday", etc.
  const dayMatch = lower.match(/next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/);
  if (dayMatch) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const target = days.indexOf(dayMatch[1]);
    const current = now.getDay();
    let diff = target - current;
    if (diff <= 0) diff += 7;
    const d = new Date(now);
    d.setDate(d.getDate() + diff);
    return { date: d.toISOString().split('T')[0], display: formatDateDisplay(d) };
  }

  // "15 April", "15 Apr", "April 15", "15/04", "15-04"
  const months: Record<string, number> = {
    jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
    apr: 3, april: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6,
    aug: 7, august: 7, sep: 8, september: 8, oct: 9, october: 9,
    nov: 10, november: 10, dec: 11, december: 11,
  };

  // "15 April" or "15 Apr"
  const dmMatch = lower.match(/(\d{1,2})\s+(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|september|oct|october|nov|november|dec|december)/);
  if (dmMatch) {
    const day = parseInt(dmMatch[1]);
    const month = months[dmMatch[2]];
    let year = now.getFullYear();
    const d = new Date(year, month, day);
    if (d < now) {
      d.setFullYear(year + 1);
    }
    return { date: d.toISOString().split('T')[0], display: formatDateDisplay(d) };
  }

  // "April 15"
  const mdMatch = lower.match(/(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|september|oct|october|nov|november|dec|december)\s+(\d{1,2})/);
  if (mdMatch) {
    const month = months[mdMatch[1]];
    const day = parseInt(mdMatch[2]);
    let year = now.getFullYear();
    const d = new Date(year, month, day);
    if (d < now) {
      d.setFullYear(year + 1);
    }
    return { date: d.toISOString().split('T')[0], display: formatDateDisplay(d) };
  }

  // "15/04" or "15-04"
  const numMatch = lower.match(/(\d{1,2})[/-](\d{1,2})/);
  if (numMatch) {
    const day = parseInt(numMatch[1]);
    const month = parseInt(numMatch[2]) - 1;
    let year = now.getFullYear();
    const d = new Date(year, month, day);
    if (d < now) {
      d.setFullYear(year + 1);
    }
    return { date: d.toISOString().split('T')[0], display: formatDateDisplay(d) };
  }

  return null;
}

/** Parse time from text like "3pm", "15:00", "3:30 PM", "morning", "evening" */
function parseTime(text: string): { time: string; display: string } | null {
  const lower = text.toLowerCase().trim();

  // "morning" / "subah"
  if (lower === 'morning' || lower === 'subah') {
    return { time: '10:00', display: '10:00 AM' };
  }
  // "afternoon" / "dopahar"
  if (lower === 'afternoon' || lower === 'dopahar') {
    return { time: '14:00', display: '2:00 PM' };
  }
  // "evening" / "shaam"
  if (lower === 'evening' || lower === 'shaam') {
    return { time: '17:00', display: '5:00 PM' };
  }

  // "3pm", "3 pm", "3PM"
  const simpleMatch = lower.match(/(\d{1,2})\s*(am|pm)/);
  if (simpleMatch) {
    let hour = parseInt(simpleMatch[1]);
    const ampm = simpleMatch[2];
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    if (hour < 9 || hour > 19) return null; // outside 9AM-7PM
    return { time: `${hour.toString().padStart(2, '0')}:00`, display: formatTimeDisplay(hour, 0) };
  }

  // "3:30 pm", "15:30"
  const fullMatch = lower.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/);
  if (fullMatch) {
    let hour = parseInt(fullMatch[1]);
    const min = parseInt(fullMatch[2]);
    const ampm = fullMatch[3];
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    if (hour < 9 || hour > 19) return null;
    return {
      time: `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`,
      display: formatTimeDisplay(hour, min),
    };
  }

  return null;
}

function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTimeDisplay(hour: number, min: number): string {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:${min.toString().padStart(2, '0')} ${ampm}`;
}

/** Check if text indicates a positive intent */
function isPositive(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return /^(yes|yeah|yep|sure|ok|okay|haan|ha|ji|schedule|book|call)/.test(lower);
}

/** Check if text indicates a negative/cancel intent */
function isNegative(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return /^(no|nah|nope|nahi|cancel|reschedulle|reschedule)/.test(lower);
}

/** Main FSM transition function */
export function handleMessage(
  state: ConversationState,
  message: string,
  context: Context,
  language: 'en' | 'hi' = 'en'
): FSMResult {
  const msg = message.trim();

  // Global cancel command from any state
  if (state === 'scheduled' && /^cancel/i.test(msg)) {
    return {
      newState: 'idle',
      responses: [getMessage('cancelled', language)],
      newContext: {},
      sideEffects: [{ type: 'cancel_call', data: { conversation_context: context } }],
    };
  }

  switch (state) {
    case 'idle': {
      return {
        newState: 'awaiting_intent',
        responses: [getMessage('greeting', language)],
        newContext: {},
        sideEffects: [],
      };
    }

    case 'awaiting_intent': {
      if (isPositive(msg)) {
        return {
          newState: 'awaiting_date',
          responses: [getMessage('ask_date', language)],
          newContext: {},
          sideEffects: [],
        };
      }
      return {
        newState: 'idle',
        responses: [getMessage('not_understood', language)],
        newContext: {},
        sideEffects: [],
      };
    }

    case 'awaiting_date': {
      const parsed = parseDate(msg);
      if (!parsed) {
        return {
          newState: 'awaiting_date',
          responses: ["I couldn't parse that date. Please try formats like: tomorrow, 15 April, next Monday, 20/04"],
          newContext: context,
          sideEffects: [],
        };
      }
      return {
        newState: 'awaiting_time',
        responses: [getMessage('ask_time', language)],
        newContext: { ...context, date: parsed.date, dateDisplay: parsed.display },
        sideEffects: [],
      };
    }

    case 'awaiting_time': {
      const parsed = parseTime(msg);
      if (!parsed) {
        return {
          newState: 'awaiting_time',
          responses: ['Please enter a time between 9 AM and 7 PM IST. Examples: 3pm, 10:30 AM, morning, evening'],
          newContext: context,
          sideEffects: [],
        };
      }
      const dateDisplay = context.dateDisplay as string;
      return {
        newState: 'confirming',
        responses: [getParameterizedMessage('confirm', language, dateDisplay, parsed.display)],
        newContext: { ...context, time: parsed.time, timeDisplay: parsed.display },
        sideEffects: [],
      };
    }

    case 'confirming': {
      if (isPositive(msg)) {
        const dateDisplay = context.dateDisplay as string;
        const timeDisplay = context.timeDisplay as string;
        const date = context.date as string;
        const time = context.time as string;

        // Combine date and time into ISO timestamp in IST
        const scheduledAt = `${date}T${time}:00+05:30`;

        return {
          newState: 'scheduled',
          responses: [getParameterizedMessage('scheduled', language, dateDisplay, timeDisplay)],
          newContext: { ...context, scheduledAt },
          sideEffects: [
            {
              type: 'schedule_call',
              data: { scheduledAt, date, time, dateDisplay, timeDisplay },
            },
          ],
        };
      }
      if (isNegative(msg)) {
        return {
          newState: 'awaiting_date',
          responses: [getMessage('reschedule', language)],
          newContext: {},
          sideEffects: [],
        };
      }
      return {
        newState: 'confirming',
        responses: ['Please reply YES to confirm or NO to pick a different time.'],
        newContext: context,
        sideEffects: [],
      };
    }

    case 'scheduled': {
      return {
        newState: 'scheduled',
        responses: [getMessage('not_understood', language)],
        newContext: context,
        sideEffects: [],
      };
    }

    default: {
      return {
        newState: 'idle',
        responses: [getMessage('greeting', language)],
        newContext: {},
        sideEffects: [],
      };
    }
  }
}
