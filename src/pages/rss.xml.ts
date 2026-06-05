import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { splitBlogId } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog'))
    .filter((entry) => entry.id !== 'index' && !!entry.data.date)
    .sort((a, b) => Number(b.data.date) - Number(a.data.date));
  const origin = site?.toString() ?? 'https://www.objectstack.ai/';
  const items = posts
    .map((post) => {
      const { lang, slug } = splitBlogId(post.id);
      const link = new URL(`/${lang}/blog/${slug}`, origin).href;
      return `<item><title><![CDATA[${post.data.title}]]></title><link>${link}</link><description><![CDATA[${post.data.description}]]></description><pubDate>${post.data.date?.toUTCString()}</pubDate></item>`;
    })
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>ObjectStack Blog</title><link>${origin}</link><description>ObjectStack updates and essays.</description>${items}</channel></rss>`,
    { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } },
  );
};
