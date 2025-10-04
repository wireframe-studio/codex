import { authedProcedure } from '@/deps/trpc/trpc';
import { userDTO } from '../dto';

export const listProcedure = authedProcedure.query(async ({ ctx }) => {
	const { db } = ctx;

	const usersRaw = await db.user.findMany();

	const users = usersRaw.map(userDTO);

	return { users };
});
