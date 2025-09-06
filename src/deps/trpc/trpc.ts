import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { db } from '@/deps/db';

export const createTRPCContext = async (opts: { headers: Headers }) => {
	return {
		db,
		session: null,
		...opts
	};
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
			}
		};
	}
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const createTRPCMiddleware = t.middleware;
