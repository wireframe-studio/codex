import { authedProcedure } from '@/deps/trpc/trpc';
import { organizationDTO } from '../dto';

export const listProcedure = authedProcedure.query(async ({ ctx }) => {
	const { db } = ctx;

	const organizationsRaw = await db.organization.findMany();

	const organizations = organizationsRaw.map(organizationDTO);

	return { organizations };
});
