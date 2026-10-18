import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const pages = JSON.parse(await readFile('src/data/seo.json', 'utf8'));
const template = await readFile('dist/index.html', 'utf8');
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const [route, page] of Object.entries(pages)) {
  const url = `https://lovelightvision.com${route}`;
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`);
  for (const [attribute, name, content] of [
    ['name', 'description', page.description],
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.description],
    ['property', 'og:url', url],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description],
  ]) {
    html = html.replace(new RegExp(`(<meta[^>]*${attribute}="${name}"[^>]*content=")[^"]*`, 'g'), (_, prefix) => prefix + escape(content));
  }
  html = html.replace(/(<link[^>]*rel="canonical"[^>]*href=")[^"]*/, (_, prefix) => prefix + url);
  const directory = resolve('dist', `.${route}`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
console.log(`Generated initial SEO metadata for ${Object.keys(pages).length} routes.`);
