import { z } from 'zod';

export const articleUpdateSchema = z.object({
	title: z.string(),
	slug: z.string(),
	content: z.string()
});

export type TArticleUpdateSchema = z.infer<typeof articleUpdateSchema>;
