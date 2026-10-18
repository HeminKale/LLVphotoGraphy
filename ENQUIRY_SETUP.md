# Enquiry delivery on Hostinger

This website no longer requires Supabase. The gallery, testimonials and page content are local assets/data. Email enquiries use PHP on Hostinger and Resend. No database is required.

Confirmed owner details:
- Email: **ulhaslp1995@gmail.com**
- WhatsApp Business: **+91 87889 25877**
- Website: **https://lovelightvision.com**

## How it works

Both Contact and Book Slot send JSON to `/api/send-enquiry.php` on the same website. PHP validates the form, keeps the recipient fixed to the server configuration, and sends the message through Resend. Reply-To uses the visitor's validated email. Both an HTML and plain text version are included.

The site reports success only when Resend accepts the request with an email ID. Actual delivery is a separate event: check Resend > Emails and the owner's inbox/spam folder. There is no database storage and submitting an enquiry does not reserve a date.

The endpoint limits each client address to five validated submissions per ten minutes using files outside the public website folder. No private credentials or enquiry messages are stored in those files. Rate-limited visitors can still use WhatsApp.

## After creating Resend

1. In Resend > Domains, add `lovelightvision.com`, add the exact SPF/DKIM DNS records supplied by Resend, and wait for Verified. Keep existing mailbox DNS records intact. You can instead verify a sending subdomain; your FROM address must use whichever domain/subdomain you actually verified.
2. Create a Sending access API key, scoped to the verified sending domain when possible.
3. Copy `hostinger/enquiry-config.example.php` to the private Hostinger directory **beside `public_html`**, rename it `enquiry-config.php`, and fill it:

   ```php
   <?php
   return [
       'resend_api_key' => 'YOUR_RESEND_KEY',
       'from_email' => 'Love Light Vision <enquiries@lovelightvision.com>',
       'to_email' => 'ulhaslp1995@gmail.com',
   ];
   ```

4. Deploy the website following [HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md).
5. Submit a deliberate test enquiry and confirm the Resend Delivered event and receipt in the owner's inbox. No real emails or WhatsApp messages were sent during development.

Never place the real configuration inside `public_html`, `public`, `dist`, a `VITE_` variable, GitHub, or chat. The repository ignores the local `enquiry-config.php` file. The public `.env.example` contains only an optional endpoint URL, not private credentials.

Without a verified domain, Resend's `onboarding@resend.dev` sender can only deliver to the email associated with the Resend account. To test to the owner's Gmail this way, that Gmail must be the account email. Production should use the verified sending domain. Gmail can be a recipient but cannot be your verified sending domain.

## WhatsApp

Both forms also offer Send via WhatsApp. This opens the owner's chat with the currently entered details. The visitor taps Send inside WhatsApp; no Resend, Supabase, or API account is required. Automatic notifications after an email submission would require a separate WhatsApp Business Platform/Cloud API integration, which is not enabled here.

## Local development

The frontend uses Vite. PHP handles the API in a separate terminal:

```powershell
npm ci
npm run dev:api
```

In a second terminal:

```powershell
npm run dev
```

Open http://127.0.0.1:5173. Vite proxies `/api` to PHP at http://127.0.0.1:8080. PHP 8.2+ with cURL is required to run email locally; the provided setup can also use an ignored `.tools/php/php.exe` runtime on Windows or a `PHP_BINARY` environment variable. With no private configuration, a form returns a clear not-configured error and WhatsApp remains available. Do not expose the project root as a PHP document root; the API command serves only `public`.

## Validation

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

The tests run the actual PHP handler with a simulated mail provider, plus render the WhatsApp component and verify the target number and encoded enquiry details. The PHP tests check validation, fixed recipient, HTML escaping, provider failures and rate limiting. They do not send real mail.

Historical Supabase database migrations remain for reference only and are not part of deployment. The old client library, Edge Function runtime and browser settings have been retired.

References:
- https://resend.com/docs/send-with-php
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://faq.whatsapp.com/5913398998672934
