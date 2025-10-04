import { TRPCError } from '@trpc/server';
import z from 'zod';

import { authedProcedure } from '@/deps/trpc/trpc';
import { userDTO } from '@/modules/user/api/dto';
import { siteDTO } from '../dto';

export const getByIdProcedure = authedProcedure
	.input(
		z.object({
			siteId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { siteId } = input;
		const { db } = ctx;

		const siteRaw = await db.site.findUnique({
			where: { id: siteId },
			include: {
				Users: {
					include: {
						User: true
					}
				}
			}
		});

		if (!siteRaw) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Site not found.'
			});
		}

		const site = siteDTO(siteRaw);
		const users = siteRaw.Users.map(({ User }) => userDTO(User));

		return { site, users };
	});
