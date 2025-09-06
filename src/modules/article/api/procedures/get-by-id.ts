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

		const article = articleRaw;

		return article;
	});

export type ArticleGetItem = Awaited<ReturnType<typeof getByIdProcedure>>;
