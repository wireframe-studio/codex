import z from 'zod';

export const organizationUpdateSchema = z.object({
	name: z.string().optional(),
	webhookUrl: z.string().optional()
});

export type TOrganizationUpdateSchema = z.infer<
	typeof organizationUpdateSchema
>;
