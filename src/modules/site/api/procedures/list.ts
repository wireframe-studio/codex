import { authedProcedure } from '@/deps/trpc/trpc';
import { siteDTO } from '../dto';

export const listProcedure = authedProcedure.query(async ({ ctx }) => {
	const { db } = ctx;

	const sitesRaw = await db.site.findMany();

	const sites = sitesRaw.map(siteDTO);

	return { sites };
});
