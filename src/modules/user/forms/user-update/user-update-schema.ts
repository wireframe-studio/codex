import z from 'zod';

export const userUpdateSchema = z.object({
	name: z.string().optional(),
	email: z.string().optional()
});

export type TUserUpdateSchema = z.infer<typeof userUpdateSchema>;
