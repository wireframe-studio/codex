import { t } from './trpc';

export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure; //.use(sessionMiddleware);
export const maybeAuthedProcedure = t.procedure; //.use(optionalSessionMiddleware);
