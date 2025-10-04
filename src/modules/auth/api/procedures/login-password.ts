import { auth } from '@/deps/better-auth/auth';
import { publicProcedure } from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { loginPasswordSchema } from '../../forms/login-password-schema';

export const loginPasswordProcedure = publicProcedure
	.input(loginPasswordSchema)
	.mutation(async ({ ctx, input }) => {
		const { email, password } = input;
		const { db } = ctx;

		const user = await db.user.findUnique({
			where: { email }
		});

		if (!user) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'User not found.'
			});
		}

		await auth.api.signInEmail({
			body: { email, password }
		});

		return {
			success: true
		};
	});
