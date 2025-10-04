import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/trpc';
import { JSONContent } from '@tiptap/react';
import { TRPCError } from '@trpc/server';

export const contentUpdateProcedure = authedProcedure
	.input(
		z.object({
			articleId: z.string(),
			content: z.any()
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;

		const { articleId, content } = input;

		const fileIdsRegex = /(?<=")file-[^"]+(?=")/g;
		const fileIds = new Set<string>(
			JSON.stringify(content).match(fileIdsRegex)
		);
		console.log('fileIds');

		// try {
		// 	validateJSONContent(content);
		// } catch (error) {
		// 	console.error(error);
		// 	throw new TRPCError({
		// 		code: 'BAD_REQUEST',
		// 		message: 'Invalid content'
		// 	});
		// }

		const articleExists = !!(await ctx.db.article.findUnique({
			where: { id: articleId }
		}));

		if (!articleExists) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Article not found'
			});
		}

		const articleRaw = await db.article.update({
			where: { id: articleId },
			data: {
				content: content as JSONContent,
				Files: {
					connect: Array.from(fileIds).map((fileId) => ({ id: fileId }))
				}
			}
		});

		const article = articleRaw;

		return { article };
	});
