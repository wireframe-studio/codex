import { authedProcedure } from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import z from 'zod';

export const imageUpdateProcedure = authedProcedure
	.input(
		z.object({
			articleId: z.string(),
			coverImageId: z.string().nullable().optional(),
			backgroundImageId: z.string().nullable().optional()
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { articleId, coverImageId, backgroundImageId } = input;

		const articleExists = await db.article.findUnique({
			where: { id: articleId }
		});

		if (!articleExists) {
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Article not found' });
		}

		const articleRaw = await db.article.update({
			where: { id: articleId },
			data: {
				...(coverImageId !== undefined ? { coverImageId } : {}),
				...(backgroundImageId !== undefined ? { backgroundImageId } : {})
			}
		});

		return { success: true };
	});
