import { publicProcedure } from '@/deps/trpc/procedures';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';
import { ArticleType } from '@prisma/client';
import z from 'zod';

export const listProcedure = publicProcedure
	.input(
		z.object({
			type: z.nativeEnum(ArticleType).optional(),
			limit: z.number().optional()
		})
	)
	.query(async ({ ctx, input }) => {
		const { db } = ctx;

		const articlesRaw = await db.article.findMany({
			where: {
				published: true,
				companyVisibility: true,
				...(input.type ? { type: input.type } : {})
			},
			orderBy: {
				date: 'desc'
			},
			include: {
				CoverImage: {
					select: {
						key: true
					}
				},
				BackgroundImage: {
					select: {
						key: true
					}
				}
			},
			...(input.limit ? { take: input.limit } : {})
		});

		const articles = await Promise.all(
			articlesRaw.map(async (articleRaw) => {
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
					views: articleRaw.views,
					reactions: articleRaw.reactions,
					coverUrl: articleRaw.CoverImage
						? await getFileDownloadUrl(articleRaw.CoverImage.key)
						: null,
					backgroundUrl: articleRaw.BackgroundImage
						? await getFileDownloadUrl(articleRaw.BackgroundImage.key)
						: null
				};

				return article;
			})
		);

		return { articles };
	});

export type ArticleListItem = Awaited<ReturnType<typeof listProcedure>>;
