import z from 'zod';

export const loginPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export type TLoginPasswordSchema = z.infer<typeof loginPasswordSchema>;
