interface MailConfig {
  apiKey?: string;
  from?: string;
  to?: string;
  fetcher?: typeof fetch;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, authorization, apikey, x-client-info',
};
const labels = ['Name', 'Email', 'Phone', 'Event', 'Event Date', 'Message'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]!));

export function createEnquiryHandler(config: MailConfig) {
  const respond = (status: number, body: object) => new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

  return async (req: Request): Promise<Response> => {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
    if (req.method !== 'POST') return respond(405, { error: 'Method not allowed' });
    if (!config.apiKey || !config.from || !config.to) {
      return respond(503, { error: 'Email delivery is not configured yet.' });
    }
    if (!req.headers.get('content-type')?.includes('application/json')) {
      return respond(415, { error: 'Use an application/json request.' });
    }
    try {
      const raw = await req.text();
      if (raw.length > 16000) return respond(413, { error: 'Enquiry is too long.' });
      let payload;
      try { payload = JSON.parse(raw); } catch { return respond(400, { error: 'Invalid enquiry payload.' }); }
      if (!payload || !['Contact Form', 'Book Slot'].includes(payload.formType)
        || !Array.isArray(payload.fields) || payload.fields.length !== labels.length) {
        return respond(400, { error: 'Invalid enquiry payload.' });
      }
      const fields = payload.fields as { label: string; value: string }[];
      if (fields.some((field, index) => !field || field.label !== labels[index]
        || typeof field.value !== 'string' || !field.value.trim() || field.value.length > 2000)) {
        return respond(400, { error: 'Please complete all enquiry fields (maximum 2000 characters each).' });
      }
      const replyTo = fields[1].value.trim();
      if (!emailPattern.test(replyTo) || /[\r\n]/.test(replyTo) || replyTo.length > 254) {
        return respond(400, { error: 'Please enter a valid email address.' });
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(fields[4].value) || Number.isNaN(Date.parse(fields[4].value))) {
        return respond(400, { error: 'Please enter a valid event date.' });
      }
      const formType = payload.formType as string;
      const text = [`New ${formType} enquiry`, ...fields.map((field) => `${field.label}: ${field.value.trim()}`)].join('\n');
      const rows = fields.map((field) => `<tr><th style="text-align:left;padding:8px">${escapeHtml(field.label)}</th><td style="padding:8px">${escapeHtml(field.value.trim()).replace(/\n/g, '<br/>')}</td></tr>`).join('');
      const response = await (config.fetcher ?? fetch)('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: config.from, to: [config.to], reply_to: replyTo,
          subject: `Love Light Vision: ${formType} enquiry`,
          text, html: `<h2>New ${escapeHtml(formType)} enquiry</h2><table>${rows}</table>`,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return respond(502, { error: 'Unable to send email. Please use WhatsApp or email the studio directly.' });
      // Accepted by the mail provider; inbox delivery is confirmed in Resend's dashboard.
      return respond(200, { ok: true });
    } catch {
      return respond(502, { error: 'Email is currently unavailable. Please use WhatsApp or email the studio directly.' });
    }
  };
}
