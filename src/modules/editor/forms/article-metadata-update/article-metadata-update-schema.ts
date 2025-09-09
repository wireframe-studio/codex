import z from 'zod';

import { ArticleType } from '@prisma/client';

export const articleMetadataUpdateSchema = z.object({
	title: z.string().optional(),
	description: z.string().nullable().optional(),
	date: z.date().nullable().optional(),
	// author: z.string().optional(),
	tags: z.array(z.string()).optional(),
	type: z.nativeEnum(ArticleType).optional(),
	companyVisibility: z.boolean().optional(),
	published: z.boolean().optional()
});

export type TArticleMetadataUpdateSchema = z.infer<
	typeof articleMetadataUpdateSchema
>;
