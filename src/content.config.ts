import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    category: z.enum(['structural', 'heritage', 'interiors', 'property-care']),
    categoryLabel: z.string(),
    image: z.string(),
    brief: z.string(),
    challenge: z.string(),
    execution: z.string(),
    gallery: z.array(z.string()).optional(),
    video: z.string().optional(),
    tags: z.array(z.string()).optional(),
    meta: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    category:    z.string(),
    service:     z.string().optional(),
    serviceUrl:  z.string().optional(),
    image:       z.string().optional(),
    author:      z.string().default('Aspect Builds & Maintenance Ltd'),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { portfolio, blog };