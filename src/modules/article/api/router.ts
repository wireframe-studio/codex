import { createTRPCRouter } from '@/deps/trpc/trpc';
import { contentUpdateProcedure } from './procedures/content-update';
import { createProcedure } from './procedures/create';
import { getByIdProcedure } from './procedures/get-by-id';
import { listProcedure } from './procedures/list';
import { metadataUpdateProcedure } from './procedures/metadata-update';

export const articleRouter = createTRPCRouter({
	list: listProcedure,
	get: getByIdProcedure,
	create: createProcedure,
	content: createTRPCRouter({
		update: contentUpdateProcedure
	}),
	metadata: createTRPCRouter({
		update: metadataUpdateProcedure
	})
});
