import { createTRPCRouter } from '@/deps/trpc/trpc';
import { getByIdProcedure } from './procedures/article/get-by-id';
import { listProcedure } from './procedures/article/list';

export const accessRouter = createTRPCRouter({
	article: {
		list: listProcedure,
		getById: getByIdProcedure
	}
});
