# Owner enquiry delivery

Confirmed destination: **ulhaslp1995@gmail.com**. WhatsApp Business: **+91 87889 25877**.
Website: **https://lovelightvision.com**.

## What works in the code

- Contact and the site-wide Book Slot drawer collect name, email, phone, event, date and message.
- Send Email Enquiry calls the public Supabase `send-enquiry` function, which validates the input and calls Resend with server-only secrets.
- The recipient is selected by the server secret, never by the visitor. Reply goes to the visitor's validated email.
- Success means Resend accepted the email, not that it has reached the inbox. Check Resend's Delivered event to verify delivery.
- Neither form stores enquiries in a database. No database migration is required for email delivery. Existing tables are preserved.
- Send via WhatsApp opens a prefilled chat to the owner with the details currently in the form. The visitor taps Send in WhatsApp. This works independently of Supabase and Resend.

## What is pending

1. The configured host `heidihkgqyytnjfklafx.supabase.co` did not resolve during the check on 18 October 2026, including outside the sandbox. Check the project in Supabase Dashboard: confirm it still exists and is active, and copy its current Project URL and anon/publishable key. The CLI is authenticated, but this project is not in the signed-in account's accessible project list, and this folder is not linked to a Supabase project. It may belong to another account/organization. Use the correct account or create a dedicated photography project; do not reuse the unrelated apps listed in the current account. A DNS failure alone does not establish whether it was paused, deleted or misconfigured.
2. Update `.env.local` using `.env.example`, then restart `npm run dev`. Use the same public variables on your website host before rebuilding/deploying.
3. Create/configure Resend and deploy the function below. Server secrets and deployed function status could not be inspected because the configured project is not accessible in the current authenticated account.
4. Send a deliberate test after setup, check the Resend delivery event and the owner's inbox/spam folder. No real emails or WhatsApp messages were sent during development.

## After creating your Resend account

1. In Resend > Domains, add your domain or a sending subdomain such as `mail.lovelightvision.com`. Add exactly the DNS records Resend supplies (SPF/DKIM) at your domain's DNS provider and wait for Verified. Keep existing mailbox DNS records intact.
2. In Resend > API Keys, create a Sending access key, scoped to your verified domain when possible.
3. In Supabase > Edge Functions > Secrets, set:

   ```text
   RESEND_API_KEY=your Resend sending key
   ENQUIRY_TO_EMAIL=ulhaslp1995@gmail.com
   ENQUIRY_FROM_EMAIL=Love Light Vision <enquiries@mail.lovelightvision.com>
   ```

   The FROM address must use the exact domain/subdomain you verified. If you verified the root domain, use `enquiries@lovelightvision.com` instead. Do not put the Resend key in a `VITE_` variable or commit it.
4. Deploy from PowerShell in this project:

   ```powershell
   supabase login
   supabase functions deploy send-enquiry --project-ref YOUR_ACTIVE_PROJECT_REF
   ```

   `supabase/config.toml` disables JWT verification for this intentionally public enquiry endpoint. It validates input and has a fixed server-side recipient. The browser sends the project's public key, which is not a private authentication credential. Do not use a service-role key in the browser.
5. Submit a test enquiry, check Edge Function logs and Resend > Emails, then confirm receipt in the owner's inbox. Resend acceptance and final delivery are separate states.

Optional CLI alternative for secrets: copy `supabase/functions/.env.example` to `supabase/functions/.env.local`, fill it locally, then run `supabase secrets set --env-file supabase/functions/.env.local --project-ref YOUR_ACTIVE_PROJECT_REF`. The `.local` file is ignored by Git. Never paste private keys into chat.

For initial testing without a verified domain, Resend's `onboarding@resend.dev` sender can only send to the email associated with your Resend account. To test directly to the owner's Gmail this way, the Resend account email must be the owner's email. Verify a sending domain to deliver to other recipients. A Gmail address can receive the mail but cannot be your verified sending domain.

## WhatsApp Business

The current implementation uses WhatsApp's click-to-chat feature. The owner receives the message on the WhatsApp account registered to the confirmed number after the visitor sends it; no API account or Resend setup is required. On a desktop, the visitor can use WhatsApp Web or the desktop app.

Automatically sending a notification when the email form is submitted is a different integration. It requires WhatsApp Business Platform/Cloud API onboarding (or an official provider), an API sender, server credentials, and an appropriate approved message template/recipient setup. Having the WhatsApp Business mobile app alone does not configure this API. That automation is not enabled in this code.

## SEO changes

- Targets Jalgaon photography searches for wedding, pre-wedding, engagement, mehndi/mehndhi, maternity, baby/newborn, family, portrait, modeling, candid, traditional and couple photography.
- Includes requested `Best photographer in Jalgon` spelling variant in metadata, with the correct Jalgaon spelling used in visible copy.
- Browser tab titles show only Love Light Vision. SEO descriptions, canonical URLs, social metadata, LocalBusiness data, robots.txt and sitemap.xml remain. The additional local service section was removed from the visible homepage at the user's request; no hidden keyword text is inserted.
- The postbuild script generates initial metadata HTML for each route so social crawlers can read it without running JavaScript. Page content still renders with React; this is not full page prerendering.
- Google does not use the meta-keywords tag for rankings. Local content, accurate business information and crawlable pages matter more. After deploying, verify the domain in Google Search Console and submit `https://lovelightvision.com/sitemap.xml`. Ranking is not guaranteed.

## Verification commands

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

References:
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/dashboard/api-keys/introduction
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://supabase.com/docs/guides/functions/deploy
- https://supabase.com/docs/guides/functions/secrets
- https://faq.whatsapp.com/5913398998672934
- https://whatsappbusiness.com/products/business-platform/
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
