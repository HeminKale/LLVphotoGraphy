import { createEnquiryHandler } from './handler.ts';

Deno.serve(createEnquiryHandler({
  apiKey: Deno.env.get('RESEND_API_KEY'),
  from: Deno.env.get('ENQUIRY_FROM_EMAIL'),
  to: Deno.env.get('ENQUIRY_TO_EMAIL'),
}));
