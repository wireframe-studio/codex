import z from 'zod';

export const siteUpdateSchema = z.object({
	name: z.string().optional(),
	webhookUrl: z.string().optional()
});

export type TSiteUpdateSchema = z.infer<typeof siteUpdateSchema>;
