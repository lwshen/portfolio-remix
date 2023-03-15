import { z } from 'zod';

export type DocAttribute = z.infer<typeof DocAttributeSchema>;

export const DocAttributeSchema = z.object({
  title: z.string(),
  published_at: z.date().optional(),
  description: z.string().optional(),
});

export type Post = {
  slug: string;
  title: string;
  markdown: string;
};
