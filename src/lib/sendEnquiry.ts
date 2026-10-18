interface EnquiryField {
  label: string;
  value: string;
}

export async function sendEnquiry(
  formType: string,
  fields: EnquiryField[],
  replyTo?: string
): Promise<{ ok: boolean; error?: string }> {
  const projectUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const publicKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
  if (!projectUrl || !publicKey) {
    return { ok: false, error: 'Email delivery is not configured yet.' };
  }
  try {
    const response = await fetch(`${projectUrl.replace(/\/$/, '')}/functions/v1/send-enquiry`, {
      method: 'POST',
      headers: { apikey: publicKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, fields, replyTo }),
      signal: AbortSignal.timeout(15000),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok || body?.ok !== true) {
      return { ok: false, error: body?.error ?? 'Unable to send your enquiry. Please use WhatsApp or email us directly.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Email is currently unavailable. Please use WhatsApp or email us directly.' };
  }
}
