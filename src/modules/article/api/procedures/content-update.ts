import { z } from 'zod';

import { validateJSONContent } from '@/deps/tiptap/validate-json-content';
import { authedProcedure } from '@/deps/trpc/procedures';
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

		try {
		} catch (error) {
			validateJSONContent(content);
			console.error(error);
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Invalid content'
			});
		}

		const articleRaw = await ctx.db.article.findUnique({
			where: { id: articleId }
		});

		if (!articleRaw) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Article not found'
			});
		}

		const article = await db.article.update({
			where: { id: articleId },
			data: {
				content: content as JSONContent,
				Files: {
					connect: Array.from(fileIds).map((fileId) => ({ id: fileId }))
				}
			}
		});

		return { article };
	});
