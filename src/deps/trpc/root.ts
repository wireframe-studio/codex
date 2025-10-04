import { createCallerFactory, createTRPCRouter } from '@/deps/trpc/trpc';
import { accessRouter } from '@/modules/access/api/router';
import { articleRouter } from '@/modules/article/api/router';
import { authRouter } from '@/modules/auth/api/router';
import { fileRouter } from '@/modules/file/api/router';
import { organizationRouter } from '@/modules/organization/api/router';
import { userRouter } from '@/modules/user/api/router';

export const appRouter = createTRPCRouter({
	auth: authRouter,
	article: articleRouter,
	file: fileRouter,
	access: accessRouter,
	user: userRouter,
	organization: organizationRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
