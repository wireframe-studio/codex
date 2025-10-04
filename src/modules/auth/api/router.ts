import { createTRPCRouter } from '@/deps/trpc/trpc';
import { loginPasswordProcedure } from './procedures/login-password';
import { meProcedure } from './procedures/me';

export const authRouter = createTRPCRouter({
	me: meProcedure,
	login: loginPasswordProcedure
});
