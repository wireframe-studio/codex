import { z } from 'zod';

export const articleCreateSchema = z.object({
	title: z.string(),
	slug: z.string(),
	content: z.string()
});

export type TArticleCreateSchema = z.infer<typeof articleCreateSchema>;
