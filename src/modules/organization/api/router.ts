import { createTRPCRouter } from '@/deps/trpc/trpc';

import { getByIdProcedure } from './procedures/get-by-id';
import { listProcedure } from './procedures/list';
import { listByUserIdProcedure } from './procedures/list-by-user-id';
import { updateProcedure } from './procedures/update';

export const organizationRouter = createTRPCRouter({
	getById: getByIdProcedure,
	list: listProcedure,
	listByUserId: listByUserIdProcedure,
	update: updateProcedure
});
