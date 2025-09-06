import { createTRPCRouter } from '@/deps/trpc/trpc';
import { contentUpdateProcedure } from './procedures/content-update';
import { getByIdProcedure } from './procedures/get-by-id';

export const articleRouter = createTRPCRouter({
	get: getByIdProcedure,
	content: createTRPCRouter({
		update: contentUpdateProcedure
	})
});
