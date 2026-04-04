/**
 * WhatsApp message templates for the scheduling flow
 * Supports English (en) and Hindi (hi)
 */

type Language = 'en' | 'hi';
type MessageValue = string | ((date: string, time: string) => string);

const messages: Record<string, Record<Language, MessageValue>> = {
  greeting: {
    en: 'Hello! Welcome to Jal Neeti Technologies. We build solar-powered, IoT-monitored water treatment systems.\n\nWould you like to schedule a call with our water treatment advisor?',
    hi: 'नमस्ते! जल नीति टेक्नोलॉजीज में आपका स्वागत है। हम सौर ऊर्जा संचालित, IoT-मॉनिटर्ड जल शोधन सिस्टम बनाते हैं।\n\nक्या आप हमारे जल शोधन सलाहकार से बात करना चाहेंगे?',
  },
  ask_date: {
    en: 'Great! What date works for you?\n\nExamples: tomorrow, 15 April, next Monday',
    hi: 'बहुत अच्छा! आपके लिए कौन सी तारीख सही रहेगी?\n\nउदाहरण: कल, 15 अप्रैल, अगला सोमवार',
  },
  ask_time: {
    en: 'Got it! What time would you prefer? We are available 9 AM to 7 PM IST.',
    hi: 'समझ गया! आप किस समय चाहेंगे? हम सुबह 9 बजे से शाम 7 बजे तक उपलब्ध हैं।',
  },
  confirm: {
    en: (date: string, time: string) =>
      `Please confirm:\n📅 Date: ${date}\n🕐 Time: ${time} IST\n\nReply YES to confirm or NO to pick a different time.`,
    hi: (date: string, time: string) =>
      `कृपया पुष्टि करें:\n📅 तारीख: ${date}\n🕐 समय: ${time} IST\n\nपुष्टि के लिए YES या अलग समय चुनने के लिए NO लिखें।`,
  },
  scheduled: {
    en: (date: string, time: string) =>
      `Done! You will receive a call on ${date} at ${time} IST from our JalBox water treatment advisor.\n\nReply CANCEL anytime to cancel.`,
    hi: (date: string, time: string) =>
      `हो गया! आपको ${date} को ${time} IST पर हमारे JalBox जल शोधन सलाहकार का कॉल आएगा।\n\nरद्द करने के लिए कभी भी CANCEL लिखें।`,
  },
  cancelled: {
    en: 'Your call has been cancelled. Reply anytime to schedule again!',
    hi: 'आपका कॉल रद्द कर दिया गया है। फिर से शेड्यूल करने के लिए कभी भी लिखें!',
  },
  reschedule: {
    en: 'No problem! Would you like to pick a different date?',
    hi: 'कोई बात नहीं! क्या आप कोई अलग तारीख चुनना चाहेंगे?',
  },
  not_understood: {
    en: "I didn't quite catch that. You can:\n- Type SCHEDULE to book a call\n- Type CANCEL to cancel an existing call\n- Or ask any question about our JalBox water treatment systems!",
    hi: 'मैं समझ नहीं पाया। आप:\n- कॉल बुक करने के लिए SCHEDULE लिखें\n- मौजूदा कॉल रद्द करने के लिए CANCEL लिखें\n- या हमारे JalBox जल शोधन सिस्टम के बारे में कोई भी सवाल पूछें!',
  },
  post_call_thanks: {
    en: 'Thank you for speaking with our advisor! If you have any follow-up questions, just reply here.',
    hi: 'हमारे सलाहकार से बात करने के लिए धन्यवाद! कोई और सवाल हो तो यहाँ लिखें।',
  },
};

/** Get a simple string message by key and language */
export function getMessage(key: string, lang: Language = 'en'): string {
  const msg = messages[key];
  if (!msg) return messages.not_understood[lang] as string;
  const val = msg[lang] ?? msg.en;
  if (typeof val === 'function') return val('', '');
  return val;
}

/** Get a parameterized message (for confirm/scheduled) */
export function getParameterizedMessage(
  key: 'confirm' | 'scheduled',
  lang: Language = 'en',
  date: string,
  time: string
): string {
  const msg = messages[key];
  const fn = msg[lang] ?? msg.en;
  if (typeof fn === 'function') return fn(date, time);
  return String(fn);
}
