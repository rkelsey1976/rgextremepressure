import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    category: z.enum(['structural', 'heritage', 'interiors']),
    categoryLabel: z.string(),
    image: z.string(),
    brief: z.string(),
    challenge: z.string(),
    execution: z.string(),
    gallery: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    meta: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { portfolio };