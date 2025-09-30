import { publicProcedure } from '@/deps/trpc/procedures';

export const listProcedure = publicProcedure
	// .input()
	.query(async ({ ctx, input }) => {
		const { db } = ctx;

		const articlesRaw = await db.article.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		});

		const articles = articlesRaw;

		return { articles };
	});

export type ArticleListItem = Awaited<ReturnType<typeof listProcedure>>;
