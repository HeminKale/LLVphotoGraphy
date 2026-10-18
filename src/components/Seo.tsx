import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { studio } from '../data/studio';
import pageMetadata from '../data/seo.json';

const pages: Record<string, { title: string; description: string }> = pageMetadata;

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const page = pages[path] ?? pages['/'];
    const url = `${studio.siteUrl}${path === '/' ? '/' : path}`;
    document.title = page.title;
    for (const [selector, content] of [
      ['meta[name="description"]', page.description],
      ['meta[property="og:title"]', page.title],
      ['meta[property="og:description"]', page.description],
      ['meta[property="og:url"]', url],
      ['meta[name="twitter:title"]', page.title],
      ['meta[name="twitter:description"]', page.description],
    ]) document.querySelector(selector)?.setAttribute('content', content);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  }, [pathname]);
  return null;
}
