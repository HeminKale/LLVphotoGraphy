import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';

const source = await readFile(new URL('../supabase/functions/send-enquiry/handler.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { createEnquiryHandler } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const valid = {
  formType: 'Contact Form',
  fields: [
    { label: 'Name', value: 'Test Visitor' },
    { label: 'Email', value: 'visitor@example.com' },
    { label: 'Phone', value: '+91 90000 00000' },
    { label: 'Event', value: 'Wedding' },
    { label: 'Event Date', value: '2027-01-20' },
    { label: 'Message', value: '<script>alert("hello")</script> & family' },
  ],
};
const config = { apiKey: 'test-key', from: 'Studio <studio@example.com>', to: 'owner@example.com' };
const request = (body = valid) => new Request('https://example.com/send-enquiry', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});

test('missing mail secrets fails explicitly without calling a provider', async () => {
  const response = await createEnquiryHandler({})(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, undefined);
});
test('preflight and GET do not send mail', async () => {
  const handler = createEnquiryHandler({ ...config, fetcher: () => assert.fail('mail must not be sent') });
  assert.equal((await handler(new Request('https://example.com', { method: 'OPTIONS' }))).status, 204);
  assert.equal((await handler(new Request('https://example.com'))).status, 405);
});
test('invalid payload, malformed JSON, missing fields and invalid email are rejected', async () => {
  const handler = createEnquiryHandler({ ...config, fetcher: () => assert.fail('mail must not be sent') });
  for (const payload of [null, {}, { ...valid, fields: [] }, { ...valid, fields: valid.fields.map(f => f.label === 'Email' ? { ...f, value: 'invalid' } : f) }]) {
    assert.equal((await handler(request(payload))).status, 400);
  }
  assert.equal((await handler(new Request('https://example.com', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }))).status, 400);
});
test('owner recipient is fixed, reply-to comes from validated email, HTML is escaped', async () => {
  let sent;
  const handler = createEnquiryHandler({ ...config, fetcher: async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    sent = JSON.parse(options.body);
    return new Response(JSON.stringify({ id: 'mail-id' }), { status: 200 });
  } });
  const response = await handler(request({ ...valid, to: 'attacker@example.com', replyTo: 'attacker@example.com' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(sent.to, ['owner@example.com']);
  assert.equal(sent.reply_to, 'visitor@example.com');
  assert.ok(!sent.html.includes('<script>'));
  assert.ok(sent.html.includes('&lt;script&gt;'));
  assert.ok(sent.text.includes('<script>'));
});
test('provider failures and network failures never report success', async () => {
  for (const fetcher of [async () => new Response('denied', { status: 403 }), async () => { throw new Error('offline'); }]) {
    const response = await createEnquiryHandler({ ...config, fetcher })(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, undefined);
  }
});
