import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const classes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/classes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    dateLabel: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
    time: z.string(),
    instructor: z.string(),
    price: z.string(),
    location: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    status: z.enum(['upcoming', 'sold-out', 'cancelled', 'past', 'coming-soon']),
    featured: z.boolean().default(false),
    registrationUrl: z.url().optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/gallery' }),
  schema: z.object({
    caption: z.string(),
    alt: z.string(),
    image: z.string(),
    category: z.enum(['studio', 'people', 'artwork', 'history']),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    headingLine1: z.string(),
    headingLine2: z.string().optional(),
    intro: z.string(),
  }),
});

export const collections = { classes, gallery, pages };
