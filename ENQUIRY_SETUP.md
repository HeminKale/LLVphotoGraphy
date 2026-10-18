# Owner email delivery on Hostinger

The site requires **no Supabase, no database, and no Resend account**. Hostinger SMTP is the default. Resend remains an optional transport if you choose it later.

Confirmed owner email: **ulhaslp1995@gmail.com**. WhatsApp Business: **+91 87889 25877**.
Website: **https://lovelightvision.com**.

## Recommended setup: Hostinger SMTP

For the studio's enquiry forms, start with an active Hostinger domain mailbox. Check whether your hosting purchase includes email or whether you need an email subscription; do not assume a mailbox is permanently included with web hosting. Sending limits depend on the email plan.

1. In Hostinger > Emails, create a mailbox such as **enquiries@lovelightvision.com** (or use another existing mailbox on your domain).
2. Make sure the domain's email DNS configuration is correct in Hostinger, including the required SPF/DKIM records. Preserve existing mailbox DNS records unless the panel specifically instructs a change.
3. Open that mailbox's **Connect Apps and Devices / Configuration** section. Copy the SMTP host, port and encryption settings shown there. For Hostinger Email the usual settings are **smtp.hostinger.com**, **465**, **SSL**. The code also supports port 587 with STARTTLS (`tls`) if that is what your mailbox provider specifies.
4. Copy `hostinger/enquiry-config.example.php` beside the domain's `public_html` folder and rename it **enquiry-config.php**. Fill the mailbox address and its password there:

   ```php
   <?php
   return [
       'transport' => 'smtp',
       'smtp_host' => 'smtp.hostinger.com',
       'smtp_port' => 465,
       'smtp_encryption' => 'ssl',
       'smtp_username' => 'enquiries@lovelightvision.com',
       'smtp_password' => 'YOUR_MAILBOX_PASSWORD',
       'from_email' => 'enquiries@lovelightvision.com',
       'from_name' => 'Love Light Vision',
       'to_email' => 'ulhaslp1995@gmail.com',
   ];
   ```

5. Upload the website following [HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md), then test Contact and Book Slot. Confirm receipt in the owner's Gmail inbox/spam folder and confirm Reply sends to the visitor.

The sending mailbox is only used to authenticate and send; the enquiry goes directly to the owner's Gmail. This password is the **domain mailbox password**, not the owner's Gmail or Hostinger login password. Keep it out of GitHub, chat, the public website directory and browser environment variables.

Hostinger SMTP is recommended over the basic PHP `mail()` function. Authenticated SMTP uses the configured email account and its sending limits. This project bundles official PHPMailer for email formatting, authenticated SMTP and encrypted connections; no Composer installation is required on Hostinger. Debug output is disabled and TLS certificate checks stay enabled.

## How enquiries work

Contact and Book Slot POST JSON to `/api/send-enquiry.php` on the same website. PHP validates the fields and event date, keeps the recipient fixed by server configuration, escapes HTML and sends both HTML and plain text versions. Reply-To uses the visitor's validated email.

Success means the configured mail server accepted the message, not proof of final inbox delivery. Hostinger SMTP delivery is checked in the receiving inbox and any available mailbox delivery tools; the optional Resend transport also has an email-event dashboard. A submitted enquiry does not reserve a date and no enquiry database is used.

A file-backed limit allows five validated submissions per client address per ten minutes. Rate-limit files are outside `public_html` and do not contain enquiry text or credentials. WhatsApp remains available if an email cannot be sent.

## Optional alternative: Resend

Resend is useful if you want a dedicated transactional email provider and delivery-event logs. It is not required for the Hostinger SMTP setup.

If you choose Resend, verify a sending domain/subdomain in Resend, create a Sending access API key, and use `hostinger/enquiry-config.resend.example.php` instead. Set `transport` to `resend`, enter the API key, and use a FROM address on the verified domain. The recipient stays the owner's Gmail. PHP cURL is required for this transport.

The Resend test sender (`onboarding@resend.dev`) only delivers to the email associated with the Resend account. Verify a sending domain for production. Never silently fall back between providers: this code uses only the explicitly configured transport.

## WhatsApp

Send via WhatsApp opens the owner's chat with the entered enquiry details. The visitor taps Send inside WhatsApp. This needs neither SMTP, Resend nor Supabase. Automatic WhatsApp notifications on email submission require a separate Business Platform/API integration and are not enabled.

## Local development and checks

```powershell
npm ci
npm run dev:api
```

In a second terminal run `npm run dev`, then open http://127.0.0.1:5173. Vite proxies `/api` to PHP on port 8080. PHP 8.2+ with OpenSSL is required for SMTP; the portable Windows runtime in ignored `.tools/php` can be used, or set `PHP_BINARY` to your PHP executable. PHP cURL is needed only for Resend. For local email configuration, copy the template to ignored `enquiry-config.php` in the project root. The API serves only `public`, never the project root.

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

Tests exercise input validation, fixed recipient, failure responses, rate limiting, actual PHPMailer MIME creation and secure SMTP configuration. The email provider is simulated; no real email or WhatsApp message is sent. Hostinger credentials and actual delivery remain to be configured/tested in the owner's account.

References:
- https://www.hostinger.com/support/1575756-how-to-get-email-account-configuration-details-for-hostinger-email/
- https://www.hostinger.com/support/11393648-php-mail-limitation-explained-how-to-improve-email-delivery-with-smtp/
- https://github.com/PHPMailer/PHPMailer
- https://resend.com/docs/send-with-php
