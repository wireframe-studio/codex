import { db } from '@/deps/db';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';

interface AttrsWithArticleFields {
	[key: string]: unknown;
	articleId?: string;
	articleSlug?: string;
	articleTitle?: string;
	articleDescription?: string;
	articleType?: string;
	articleCoverUrl?: string;
}

export const hydrateArticleReferences = async (
	content: unknown
): Promise<unknown> => {
	if (typeof content === 'string') {
		return content;
	}

	if (Array.isArray(content)) {
		return Promise.all(content.map((item) => hydrateArticleReferences(item)));
	}

	if (content && typeof content === 'object') {
		const result: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(content)) {
			if (key === 'attrs' && value && typeof value === 'object') {
				// Handle attrs object for article reference hydration
				const attrs = value as AttrsWithArticleFields;
				result[key] = { ...attrs };

				const articleId = attrs.articleId;
				const articleSlug = attrs.articleSlug;
				const articleTitle = attrs.articleTitle;
				const articleDescription = attrs.articleDescription;
				const articleType = attrs.articleType;
				const articleCoverUrl = attrs.articleCoverUrl;

				// If articleId exists and any of the other fields are empty, hydrate them
				if (
					articleId &&
					(!articleSlug ||
						!articleTitle ||
						!articleDescription ||
						!articleType ||
						!articleCoverUrl)
				) {
					try {
						const article = await db.article.findUnique({
							where: { id: articleId },
							include: {
								CoverImage: {
									select: {
										key: true
									}
								}
							}
						});

						if (article) {
							// Only update fields that are empty
							if (!articleSlug) {
								(result[key] as AttrsWithArticleFields).articleSlug =
									article.slug ?? '';
							}
							if (!articleTitle) {
								(result[key] as AttrsWithArticleFields).articleTitle =
									article.title ?? '';
							}
							if (!articleDescription) {
								(result[key] as AttrsWithArticleFields).articleDescription =
									article.description ?? '';
							}
							if (!articleType) {
								(result[key] as AttrsWithArticleFields).articleType =
									article.type ?? '';
							}
							if (!articleCoverUrl && article.CoverImage) {
								const coverUrl = await getFileDownloadUrl(
									article.CoverImage.key
								);
								(result[key] as AttrsWithArticleFields).articleCoverUrl =
									coverUrl;
							} else if (!articleCoverUrl) {
								(result[key] as AttrsWithArticleFields).articleCoverUrl = '';
							}
						}
					} catch (error) {
						console.warn(
							`Failed to hydrate article reference for articleId: ${articleId}`,
							error
						);
						// Keep the existing values if hydration fails
					}
				}
			} else {
				// Recursively process other properties
				result[key] = await hydrateArticleReferences(value);
			}
		}

		return result;
	}

	return content;
};
