import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://www.objectstack.ai',
  server: { host: true },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
    }),
  ],
});
