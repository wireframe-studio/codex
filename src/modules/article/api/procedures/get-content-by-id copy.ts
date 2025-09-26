import { publicProcedure } from '@/deps/trpc/procedures';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const getContentByIdProcedure = publicProcedure
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

		const content = articleRaw.content;

		return { content };
	});

export type ArticleGetContentItem = Awaited<
	ReturnType<typeof getContentByIdProcedure>
>;
