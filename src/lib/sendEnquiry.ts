interface EnquiryField {
  label: string;
  value: string;
}

export async function sendEnquiry(
  formType: string,
  fields: EnquiryField[],
  replyTo?: string
): Promise<{ ok: boolean; error?: string }> {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT?.trim() || '/api/send-enquiry.php';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
