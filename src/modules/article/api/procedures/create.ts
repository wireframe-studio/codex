import { authedProcedure } from '@/deps/trpc/trpc';

export const createProcedure = authedProcedure.mutation(async ({ ctx }) => {
	const { db, user } = ctx;

	const articleRaw = await db.article.create({
		data: { Authors: { connect: { id: user.id } }, title: 'New Article' }
	});

	const article = articleRaw;

	return { article };
});
