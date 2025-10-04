import z from 'zod';

import { authedProcedure } from '@/deps/trpc/trpc';
import { userDTO } from '../dto';

export const listByOrganizationIdProcedure = authedProcedure
	.input(z.object({ organizationId: z.string() }))
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { organizationId } = input;

		const usersRaw = await db.user.findMany({
			where: {
				Organizations: {
					some: {
						organizationId
					}
				}
			}
		});

		const users = usersRaw.map(userDTO);

		return { users };
	});
