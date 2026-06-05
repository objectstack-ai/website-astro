import type { APIRoute } from 'astro';
import { contentSections, languages } from '../lib/site';

export const GET: APIRoute = () => {
  const routes = languages.flatMap((lang) => [
    `/${lang}`,
    `/${lang}/agents`,
    `/${lang}/blog`,
    ...contentSections.map((section) => `/${lang}/${section}`),
  ]);
  return new Response(
    ['# ObjectStack', 'AI-native application development and runtime platform website.', '', ...routes].join('\n'),
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
};
