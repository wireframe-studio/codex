import { authedProcedure } from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import z from 'zod';
import { organizationUpdateSchema } from '../../forms/organization-update/organization-update-schema';
import { organizationDTO } from '../dto';

export const updateProcedure = authedProcedure
	.input(
		z.object({
			organizationId: z.string(),
			data: organizationUpdateSchema
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { organizationId, data } = input;
		const { db } = ctx;

		const organizationExists = await db.organization.findUnique({
			where: { id: organizationId }
		});

		if (!organizationExists) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Organization not found'
			});
		}

		const organizationRaw = await db.organization.update({
			where: { id: organizationId },
			data
		});

		const organization = organizationDTO(organizationRaw);

		return { organization };
	});
