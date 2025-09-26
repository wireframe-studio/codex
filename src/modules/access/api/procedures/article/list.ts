import { publicProcedure } from '@/deps/trpc/procedures';

export const listProcedure = publicProcedure
	// .input()
	.query(async ({ ctx, input }) => {
		const { db } = ctx;

		const articlesRaw = await db.article.findMany({
			where: {
				published: true,
				companyVisibility: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		const articles = articlesRaw.map((articleRaw) => {
			const article = {
				id: articleRaw.id,
				createdAt: articleRaw.createdAt,
				updatedAt: articleRaw.updatedAt,
				title: articleRaw.title,
				description: articleRaw.description,
				date: articleRaw.date,
				tags: articleRaw.tags,
				type: articleRaw.type,
				views: articleRaw.views,
				reactions: articleRaw.reactions
			};

			return article;
		});

		return { articles };
	});

export type ArticleListItem = Awaited<ReturnType<typeof listProcedure>>;
