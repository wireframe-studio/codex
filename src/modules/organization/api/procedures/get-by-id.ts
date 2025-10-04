import { TRPCError } from '@trpc/server';
import z from 'zod';

import { authedProcedure } from '@/deps/trpc/trpc';
import { userDTO } from '@/modules/user/api/dto';
import { organizationDTO } from '../dto';

export const getByIdProcedure = authedProcedure
	.input(
		z.object({
			organizationId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { organizationId } = input;
		const { db } = ctx;

		const organizationRaw = await db.organization.findUnique({
			where: { id: organizationId },
			include: {
				Users: {
					include: {
						User: true
					}
				}
			}
		});

		if (!organizationRaw) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Organization not found.'
			});
		}

		const organization = organizationDTO(organizationRaw);
		const users = organizationRaw.Users.map(({ User }) => userDTO(User));

		return { organization, users };
	});
