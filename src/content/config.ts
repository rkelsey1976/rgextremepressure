import { defineCollection, z } from 'astro:content';

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    location: z.string(),
    category: z.string(),
    categoryLabel: z.string(),
    image: z.string(),
    brief: z.string(),
    challenge: z.string(),
    execution: z.string(),
    gallery: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    meta: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { portfolio };
