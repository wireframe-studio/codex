import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';
import { hydrateImageUrls } from '@/modules/access/utils/hydrate-image-urls';
import { TRPCError } from '@trpc/server';

export const getByIdProcedure = publicProcedure
	.input(
		z.object({
			articleId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		// const { articleId } = input;
		const articleId = 'cmfbbfbi00002uu0sq12a0n0d';

		const articleRaw = await db.article.findUnique({
			where: { id: articleId }
		});

		if (!articleRaw) {
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Article not found' });
		}

		await db.article.update({
			where: { id: articleId },
			data: {
				views: { increment: 1 }
			}
		});

		const hydratedContent = await hydrateImageUrls(articleRaw.content);

		const article = {
			id: articleRaw.id,
			createdAt: articleRaw.createdAt,
			updatedAt: articleRaw.updatedAt,
			title: articleRaw.title,
			slug: articleRaw.slug,
			description: articleRaw.description,
			date: articleRaw.date,
			tags: articleRaw.tags,
			type: articleRaw.type,
			companyVisibility: articleRaw.companyVisibility,
			published: articleRaw.published,
			views: articleRaw.views + 1,
			reactions: articleRaw.reactions,
			content: hydratedContent
		};

		return article;
	});

export type ArticleGetItem = Awaited<ReturnType<typeof getByIdProcedure>>;
