import { createCallerFactory, createTRPCRouter } from '@/deps/trpc/trpc';
import { articleRouter } from '@/modules/article/api/router';
import { fileRouter } from '@/modules/file/api/router';

export const appRouter = createTRPCRouter({
	article: articleRouter,
	file: fileRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
