import { publicProcedure } from '@/deps/trpc/procedures';

export const createProcedure = publicProcedure.mutation(
	async ({ ctx, input }) => {
		const { db } = ctx;

		const articleRaw = await db.article.create({
			data: {}
		});

		const article = articleRaw;

		return { article };
	}
);
