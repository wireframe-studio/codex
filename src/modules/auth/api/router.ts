import { createTRPCRouter } from '@/deps/trpc/trpc';
import { meProcedure } from './procedures/me';

export const authRouter = createTRPCRouter({
	me: meProcedure
});
