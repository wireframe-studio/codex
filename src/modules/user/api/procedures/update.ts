import { authedProcedure } from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import z from 'zod';
import { userUpdateSchema } from '../../forms/user-update/user-update-schema';
import { userDTO } from '../dto';

export const updateProcedure = authedProcedure
	.input(
		z.object({
			userId: z.string(),
			data: userUpdateSchema
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { userId, data } = input;
		const { db } = ctx;

		const userExists = await db.user.findUnique({
			where: { id: userId }
		});

		if (!userExists) {
			throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
		}

		const userRaw = await db.user.update({
			where: { id: userId },
			data
		});

		const user = userDTO(userRaw);

		return { user };
	});
