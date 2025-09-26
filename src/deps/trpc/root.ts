import { createCallerFactory, createTRPCRouter } from '@/deps/trpc/trpc';
import { accessRouter } from '@/modules/access/api/router';
import { articleRouter } from '@/modules/article/api/router';
import { fileRouter } from '@/modules/file/api/router';

export const appRouter = createTRPCRouter({
	article: articleRouter,
	file: fileRouter,
	access: accessRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
