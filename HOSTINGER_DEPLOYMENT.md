# Deploy Love Light Vision to Hostinger Web Hosting

For Hostinger Single, Premium or Business **web hosting with PHP**. You do not need Supabase, Resend, MySQL, a Node.js backend, or a database for the current site. Node is used only to build the frontend before uploading it.

## Build and upload

1. Select PHP **8.2 or newer** in Hostinger and confirm PHP **OpenSSL** is enabled for encrypted SMTP. cURL is needed only if you choose the optional Resend transport.
2. From the project folder run `npm ci` and `npm run build`.
3. In Hostinger File Manager, open the document root for `lovelightvision.com` (normally `public_html`). Back up any existing site before replacing it.
4. Upload **the contents of `dist`**, not the entire source repository and not a containing `dist` folder. Include the hidden `.htaccess` file. If using the prepared `hostinger-site.zip`, extract it directly into `public_html`.
5. Create a domain mailbox and add the private SMTP configuration outside `public_html`, as shown below.
6. Connect the domain to this hosting account, enable HTTPS, and redirect the alternate www/non-www domain to `https://lovelightvision.com`. Check your mailbox DNS setup in Hostinger and keep existing mail records intact.

Expected placement:

```text
lovelightvision.com/
  enquiry-config.php          PRIVATE: SMTP mailbox password, outside public_html
  .enquiry-rate-limit/         Created automatically; must be writable by PHP
  public_html/
    .htaccess
    index.html
    logo.png
    robots.txt
    sitemap.xml
    assets/
    about/index.html
    portfolio/index.html
    contact/index.html
    testimonials/index.html
    api/
      send-enquiry.php
      enquiry-handler.php
      smtp-transport.php
      lib/phpmailer/          Bundled library and license; include this folder
```

Use `hostinger/enquiry-config.example.php` as the template for `enquiry-config.php`. Do not upload the real configuration inside the website folder. Normal PHP execution is required; never serve the PHP scripts with a static-only server. The PHP user must be able to create/write `.enquiry-rate-limit` beside `public_html`; create it in File Manager with permissions restricted to the account if necessary.

The supplied `.htaccess` serves generated page metadata, handles direct page refreshes and prevents missing API URLs from falling back to the React app. Ensure it replaces any old application's routing rules in this document root.

## Test before announcing launch

- Open `/`, `/about`, `/portfolio`, `/testimonials`, and `/contact` directly and refresh each page.
- Confirm the About portrait is the supplied Ulhas photo and browser titles say Love Light Vision.
- Submit both Contact and Book Slot; check the owner's inbox/spam folder.
- Confirm Reply-To points to the test visitor address.
- Open Send via WhatsApp and confirm the destination and filled details before sending.
- Confirm `https://lovelightvision.com/enquiry-config.php` is inaccessible and no secret file exists inside `public_html`.
- Submit `https://lovelightvision.com/sitemap.xml` in Google Search Console.

## Later updates

Rebuild after code/photo changes and replace the published build contents. Keep the private server configuration outside `public_html` so it survives frontend deployments. GitHub's `option-4` branch stores source code; uploading source directly without building is not the same as deploying this Vite app.

The build generates metadata for each page. These are React entry pages with static head metadata, not full server-rendered page content. SEO descriptions, local business structured data, sitemap and social previews are retained; no visible keyword-only service block is added.

Current project state: the backend is implemented and tested locally with simulated delivery and real PHPMailer message preparation. Hostinger upload, mailbox creation, private SMTP configuration and live email delivery still need to be completed in the owner's account. Resend registration is optional.

For the full SMTP mailbox setup, configuration example and optional Resend alternative, see [ENQUIRY_SETUP.md](ENQUIRY_SETUP.md).
