#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cwd, exit } from 'node:process';

const ROOT = cwd();
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.objectstack.ai';
const LOCALES = ['en', 'zh-Hans', 'zh-Hant'];
const CONTENT_SECTIONS = [
  'objectstack',
  'objectql',
  'objectos',
  'objectui',
  'cloud',
  'studio',
  'cli',
  'enterprise',
  'pricing',
  'integrations',
  'market',
  'solutions',
  'privacy',
  'terms',
];
const ROUTES = LOCALES.flatMap((locale) => [
  `/${locale}/`,
  `/${locale}/agents/`,
  `/${locale}/blog/`,
  ...CONTENT_SECTIONS.map((section) => `/${locale}/${section}/`),
]);
const issues = [];

async function readDist(file) {
  try {
    return await readFile(path.join(DIST, file), 'utf8');
  } catch {
    issues.push(`Missing dist file: ${file}`);
    return '';
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    if (entry.isFile()) files.push(full);
  }
  return files;
}

function requireContains(file, body, pattern, message) {
  const ok = typeof pattern === 'string' ? body.includes(pattern) : pattern.test(body);
  if (!ok) issues.push(`${file}: ${message}`);
}

const robots = await readDist('robots.txt');
requireContains(
  'robots.txt',
  robots,
  `Sitemap: ${SITE}/sitemap-index.xml`,
  'does not point crawlers to the sitemap index'
);

const sitemapIndex = await readDist('sitemap-index.xml');
requireContains('sitemap-index.xml', sitemapIndex, `${SITE}/sitemap-0.xml`, 'missing sitemap-0.xml entry');

const sitemap = await readDist('sitemap-0.xml');
for (const route of ROUTES) {
  requireContains('sitemap-0.xml', sitemap, `${SITE}${route}`, `missing route ${route}`);
}

const llms = await readDist('llms.txt');
requireContains('llms.txt', llms, '# ObjectStack', 'missing title');
for (const route of ROUTES) {
  requireContains('llms.txt', llms, route.replace(/\/$/, ''), `missing route ${route}`);
}

const rootRss = await readDist('rss.xml');
requireContains('rss.xml', rootRss, '<rss version="2.0"', 'is not an RSS feed');
requireContains('rss.xml', rootRss, '<title>ObjectStack Blog</title>', 'missing feed title');
requireContains('rss.xml', rootRss, '<item>', 'has no feed items');

const htmlFiles = (await walk(DIST))
  .filter((file) => file.endsWith('.html'))
  .map((file) => path.relative(DIST, file).split(path.sep).join('/'))
  .filter((file) => file !== 'index.html' && file !== '404.html')
  .filter((file) => LOCALES.some((locale) => file.startsWith(`${locale}/`)));

for (const file of htmlFiles) {
  const html = await readDist(file);
  const expectedPath = `/${file.replace(/index\.html$/, '')}`;
  const canonical = `${SITE}${expectedPath}`;
  requireContains(file, html, `<link rel="canonical" href="${canonical}">`, 'missing expected canonical URL');
  requireContains(file, html, `<meta property="og:url" content="${canonical}">`, 'missing expected Open Graph URL');

  const locale = LOCALES.find((candidate) => file.startsWith(`${candidate}/`));
  if (locale) {
    requireContains(file, html, `<html lang="${locale}">`, 'missing matching html lang');
    requireContains(file, html, 'rel="alternate" hreflang="x-default"', 'missing x-default hreflang');
  }
}

if (issues.length > 0) {
  for (const issue of issues) console.error(`x ${issue}`);
  console.error(`\nSEO smoke test failed (${issues.length} issue${issues.length === 1 ? '' : 's'})`);
  exit(1);
}

console.log(`SEO smoke test passed (${htmlFiles.length} HTML pages checked)`);
