import { authedProcedure } from '@/deps/trpc/procedures';
import { articleMetadataUpdateSchema } from '@/modules/editor/forms/article-metadata-update/article-metadata-update-schema';

import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const metadataUpdateProcedure = authedProcedure
	.input(
		z.object({
			articleId: z.string(),
			metadata: articleMetadataUpdateSchema
		})
	)
	.mutation(async ({ ctx, input }) => {
		console.log();

		const { db } = ctx;

		const { articleId, metadata } = input;

		const articleExists = !!(await db.article.findUnique({
			where: { id: articleId }
		}));

		if (!articleExists) {
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Article not found' });
		}

		const articleRaw = await db.article.update({
			where: { id: articleId },
			data: {
				companyVisibility: metadata.companyVisibility,
				published: metadata.published,
				date: metadata.date,
				// author: metadata.author,
				tags: metadata.tags,
				type: metadata.type,
				title: metadata.title,
				slug: metadata.slug,
				description: metadata.description
			}
		});

		const article = articleRaw;

		return { article };
	});
