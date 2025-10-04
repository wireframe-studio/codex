import z from 'zod';

export const registerPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string()
});

export type TRegisterPasswordSchema = z.infer<typeof registerPasswordSchema>;
