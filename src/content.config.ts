import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    author:      z.string().default('RG Extreme Pressure'),
    featured:    z.boolean().default(false),
    draft:       z.boolean().default(false),
  }),
});

export const collections = { blog };