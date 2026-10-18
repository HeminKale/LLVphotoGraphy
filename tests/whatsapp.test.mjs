import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const compile = (file, dependencies = {}) => {
  const source = readFileSync(new URL(file, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', outputText)((name) => dependencies[name] ?? require(name), module, module.exports);
  return module.exports;
};
const studio = compile('../src/data/studio.ts');
const { default: WhatsAppLink } = compile('../src/components/EnquiryWhatsAppLink.tsx', { '../data/studio': studio });

test('WhatsApp enquiry link targets owner and preserves all entered details', () => {
  const details = { name: 'Test & Family', email: 'guest@example.com', phone: '+91 90000 00000', eventName: 'Mehndi', eventDate: '2027-01-20', message: 'Two days\nOutdoor shoot?' };
  const markup = renderToStaticMarkup(React.createElement(WhatsAppLink, { details }));
  const href = markup.match(/href="([^"]+)"/)[1].replaceAll('&amp;', '&').replaceAll('&#x27;', "'");
  const url = new URL(href);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/918788925877');
  const message = url.searchParams.get('text');
  for (const value of Object.values(details)) assert.ok(message.includes(value));
  assert.ok(markup.includes('Tap Send'));
});
test('WhatsApp link works before fields are filled and renders no undefined values', () => {
  const details = { name: '', email: '', phone: '', eventName: 'Wedding', eventDate: '', message: '' };
  const markup = renderToStaticMarkup(React.createElement(WhatsAppLink, { details }));
  assert.ok(markup.includes('https://wa.me/918788925877'));
  assert.ok(!markup.includes('undefined'));
});
