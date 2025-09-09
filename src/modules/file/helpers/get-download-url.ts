import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from '@/env';
import { unstable_cache } from 'next/cache';
import { r2Client } from './client';

const bucket = env.CLOUDFLARE_R2_BUCKET_NAME;

const cacheDuration = 7 * 60 * 60 * 24; // 7 days

export const getFileDownloadUrl = async (key: string) => {
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: key
	});

	return await unstable_cache(
		async () => {
			return await getSignedUrl(r2Client, command, {
				expiresIn: cacheDuration
			});
		},
		['file#' + key],
		{
			revalidate: cacheDuration
		}
	)();
};
