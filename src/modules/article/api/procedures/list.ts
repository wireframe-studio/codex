import { publicProcedure } from '@/deps/trpc/trpc';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';

export const listProcedure = publicProcedure
	// .input()
	.query(async ({ ctx, input }) => {
		const { db } = ctx;

		const articlesRaw = await db.article.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				CoverImage: {
					select: {
						key: true
					}
				}
			}
		});

		const articles = await Promise.all(
			articlesRaw.map(async (article) => ({
				...article,
				coverImageUrl: article.CoverImage
					? await getFileDownloadUrl(article.CoverImage.key)
					: null
			}))
		);

		return { articles };
	});

export type ArticleListItem = Awaited<ReturnType<typeof listProcedure>>;
