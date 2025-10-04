import { TRPCError } from '@trpc/server';
import z from 'zod';

import { authedProcedure } from '@/deps/trpc/trpc';
import { userDTO } from '../dto';

export const getByIdProcedure = authedProcedure
	.input(
		z.object({
			userId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { userId } = input;
		const { db } = ctx;

		const userRaw = await db.user.findUnique({
			where: { id: userId },
			include: {
				Organizations: {
					include: {
						Organization: true
					}
				}
			}
		});

		if (!userRaw) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'User not found.'
			});
		}

		const user = userDTO(userRaw);

		return { user };
	});
