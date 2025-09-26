import { db } from '@/deps/db';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';

interface AttrsWithImage {
	imageId?: string;
	imageUrl?: string;
	[key: string]: unknown;
}

export const hydrateImageUrls = async (content: unknown): Promise<unknown> => {
	if (typeof content === 'string') {
		return content;
	}

	if (Array.isArray(content)) {
		return Promise.all(content.map((item) => hydrateImageUrls(item)));
	}

	if (content && typeof content === 'object') {
		const result: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(content)) {
			if (key === 'attrs' && value && typeof value === 'object') {
				// Handle attrs object specifically for imageId/imageUrl pairs
				const attrs = value as AttrsWithImage;
				result[key] = { ...attrs };

				// If imageId exists and imageUrl is empty, hydrate it
				if (attrs.imageId && !attrs.imageUrl) {
					try {
						const fileKey = await db.s3Object.findUnique({
							where: { id: attrs.imageId }
						});

						if (!fileKey) {
							throw new Error('File not found');
						}

						const imageUrl = await getFileDownloadUrl(fileKey.key);
						(result[key] as AttrsWithImage).imageUrl = imageUrl;

						console.log('key', key);
						console.log('value', value);
						console.log('imageUrl', imageUrl);
						console.log();
					} catch (error) {
						console.warn(
							`Failed to get download URL for imageId: ${attrs.imageId}`,
							error
						);
						// Keep the empty imageUrl if download fails
						(result[key] as AttrsWithImage).imageUrl = '';
					}
				}
			} else {
				// Recursively process other properties
				result[key] = await hydrateImageUrls(value);
			}
		}

		return result;
	}

	return content;
};
