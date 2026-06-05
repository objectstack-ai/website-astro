import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './content/blog',
    generateId: ({ entry }) =>
      entry.replace(/\.mdx$/, '').replace(/\/index(\.[\w-]+)?$/, '$1'),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('ObjectStack Team'),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
