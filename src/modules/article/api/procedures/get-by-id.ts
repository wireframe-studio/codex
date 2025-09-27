import { publicProcedure } from '@/deps/trpc/procedures';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const getByIdProcedure = publicProcedure
	.input(
		z.object({
			articleId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { articleId } = input;

		const articleRaw = await db.article.findUnique({
			where: { id: articleId }
		});

		if (!articleRaw) {
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Article not found' });
		}

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
			views: articleRaw.views,
			reactions: articleRaw.reactions,
			coverImageId: articleRaw.coverImageId,
			backgroundImageId: articleRaw.backgroundImageId
		};

		return article;
	});

export type ArticleGetItem = Awaited<ReturnType<typeof getByIdProcedure>>;
