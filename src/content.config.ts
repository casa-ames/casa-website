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
    focusX: z.number().min(0).max(100).default(50),
    focusY: z.number().min(0).max(100).default(50),
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
    focusX: z.number().min(0).max(100).default(50),
    focusY: z.number().min(0).max(100).default(50),
    category: z.enum(['studio', 'people', 'artwork', 'history']),
    order: z.number(),
    featured: z.boolean().default(false),
    hero: z.boolean().default(false),
  }),
});

const externalGalleries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/external-galleries' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.url(),
    linkLabel: z.string().default('View gallery'),
    image: z.string(),
    imageAlt: z.string(),
    focusX: z.number().min(0).max(100).default(50),
    focusY: z.number().min(0).max(100).default(50),
    order: z.number(),
    visible: z.boolean().default(true),
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

export const collections = { classes, gallery, externalGalleries, pages };
