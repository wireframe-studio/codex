import { db } from '@/deps/db';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';

const pairsToHydrate = [
	['imageId', 'imageUrl'],
	['backgroundImageId', 'backgroundUrl'],
	['coverImageId', 'coverUrl'],
	['fileId', 'fileUrl'],
	['videoId', 'videoUrl'],
	['thumbnailId', 'thumbnailUrl']
];

interface AttrsWithHydratableFields {
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
				// Handle attrs object for all hydratable pairs
				const attrs = value as AttrsWithHydratableFields;
				result[key] = { ...attrs };

				// Process all pairs to hydrate
				for (const [idField, urlField] of pairsToHydrate) {
					const idValue = attrs[idField] as string | undefined;
					const urlValue = attrs[urlField] as string | undefined;

					// If ID exists and URL is empty, hydrate it
					if (idValue && !urlValue) {
						try {
							const fileKey = await db.s3Object.findUnique({
								where: { id: idValue }
							});

							if (!fileKey) {
								throw new Error('File not found');
							}

							const downloadUrl = await getFileDownloadUrl(fileKey.key);
							(result[key] as AttrsWithHydratableFields)[urlField] =
								downloadUrl;

							console.log('key', key);
							console.log('value', value);
							console.log(`${urlField}`, downloadUrl);
							console.log();
						} catch (error) {
							console.warn(
								`Failed to get download URL for ${idField}: ${idValue}`,
								error
							);
							// Keep the empty URL if download fails
							(result[key] as AttrsWithHydratableFields)[urlField] = '';
						}
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
