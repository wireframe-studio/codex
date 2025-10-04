import z from 'zod';

import { authedProcedure } from '@/deps/trpc/trpc';
import { organizationDTO } from '../dto';

export const listByUserIdProcedure = authedProcedure
	.input(z.object({ userId: z.string() }))
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { userId } = input;

		const organizationsRaw = await db.organization.findMany({
			where: {
				Users: {
					some: {
						userId
					}
				}
			}
		});

		const organizations = organizationsRaw.map(organizationDTO);

		return { organizations };
	});
