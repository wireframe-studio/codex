import z from 'zod';

import { authedProcedure } from '@/deps/trpc/trpc';
import { userDTO } from '../dto';

export const listBySiteIdProcedure = authedProcedure
	.input(z.object({ siteId: z.string() }))
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { siteId } = input;

		const usersRaw = await db.user.findMany({
			where: {
				Sites: {
					some: {
						siteId
					}
				}
			}
		});

		const users = usersRaw.map(userDTO);

		return { users };
	});
