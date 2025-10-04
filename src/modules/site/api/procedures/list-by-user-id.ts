import z from 'zod';

import { authedProcedure } from '@/deps/trpc/trpc';
import { siteDTO } from '../dto';

export const listByUserIdProcedure = authedProcedure
	.input(z.object({ userId: z.string() }))
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { userId } = input;

		const sitesRaw = await db.site.findMany({
			where: {
				Users: {
					some: {
						userId
					}
				}
			}
		});

		const sites = sitesRaw.map(siteDTO);

		return { sites };
	});
