import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/trpc';
import { hydrateArticleReferences } from '@/modules/access/utils/hydrate-article-references';
import { hydrateImageUrls } from '@/modules/access/utils/hydrate-image-urls';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';
import { TRPCError } from '@trpc/server';

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
			where: { id: articleId },
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
			}
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

		const hydratedContent = await hydrateArticleReferences(
			await hydrateImageUrls(articleRaw.content)
		);

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
			content: hydratedContent,
			coverUrl: articleRaw.CoverImage
				? await getFileDownloadUrl(articleRaw.CoverImage.key)
				: null,
			backgroundUrl: articleRaw.BackgroundImage
				? await getFileDownloadUrl(articleRaw.BackgroundImage.key)
				: null
		};

		return article;
	});

export type ArticleGetItem = Awaited<ReturnType<typeof getByIdProcedure>>;
