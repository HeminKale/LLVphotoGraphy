# Love Light Vision Photography

React, TypeScript, Vite and Tailwind photography website, with a PHP enquiry endpoint for Hostinger Web Hosting and Resend email delivery. No Supabase account or database is required.

```powershell
npm ci
npm run dev
```

Local website: http://localhost:5173

For the email endpoint, run `npm run dev:api` in a second terminal (PHP 8.2+ with cURL). Without Resend configuration the frontend still works, and WhatsApp links work independently.

- [Hostinger deployment](HOSTINGER_DEPLOYMENT.md)
- [Owner email and WhatsApp setup](ENQUIRY_SETUP.md)

Checks: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.
