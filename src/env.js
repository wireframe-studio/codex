import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
		JWT_SECRET: z.string(),

		// Prisma
		DATABASE_URL: z.string().url(),

		// Cloudflare
		CLOUDFLARE_ACCESS_ID: z.string(),
		CLOUDFLARE_ACCESS_KEY: z.string(),
		CLOUDFLARE_ENDPOINT: z.string(),
		CLOUDFLARE_R2_BUCKET_NAME: z.string()
	},

	client: {
		NEXT_PUBLIC_URL: z.string(),
		NEXT_PUBLIC_DEPLOYMENT: z.enum(['staging', 'production'])
	},

	runtimeEnv: {
		// Server
		NODE_ENV: process.env.NODE_ENV,
		JWT_SECRET: process.env.JWT_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,

		// Client
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		NEXT_PUBLIC_DEPLOYMENT: process.env.NEXT_PUBLIC_DEPLOYMENT,

		// Cloudflare
		CLOUDFLARE_ACCESS_ID: process.env.CLOUDFLARE_ACCESS_ID,
		CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
		CLOUDFLARE_ENDPOINT: process.env.CLOUDFLARE_ENDPOINT,
		CLOUDFLARE_R2_BUCKET_NAME: process.env.CLOUDFLARE_R2_BUCKET_NAME
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true
});
