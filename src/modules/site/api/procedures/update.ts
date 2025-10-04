import { authedProcedure } from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import z from 'zod';
import { siteUpdateSchema } from '../../forms/site-update/site-update-schema';
import { siteDTO } from '../dto';

export const updateProcedure = authedProcedure
	.input(
		z.object({
			siteId: z.string(),
			data: siteUpdateSchema
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { siteId, data } = input;
		const { db } = ctx;

		const siteExists = await db.site.findUnique({
			where: { id: siteId }
		});

		if (!siteExists) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Site not found'
			});
		}

		const siteRaw = await db.site.update({
			where: { id: siteId },
			data
		});

		const site = siteDTO(siteRaw);

		return { site };
	});
