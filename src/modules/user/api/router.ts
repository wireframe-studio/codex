import { createTRPCRouter } from '@/deps/trpc/trpc';

import { getByIdProcedure } from './procedures/get-by-id';
import { listProcedure } from './procedures/list';
import { listByOrganizationIdProcedure } from './procedures/list-by-organization-id';
import { updateProcedure } from './procedures/update';

export const userRouter = createTRPCRouter({
	getById: getByIdProcedure,
	list: listProcedure,
	listByOrganizationId: listByOrganizationIdProcedure,
	update: updateProcedure
});
