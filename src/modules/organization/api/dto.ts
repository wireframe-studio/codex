import { type Organization } from '@prisma/client';

export const organizationDTO = (organization: Organization) => ({
	id: organization.id,
	name: organization.name,
	webhookUrl: organization.webhookUrl,
	createdAt: organization.createdAt
});

export type OrganizationDTO = ReturnType<typeof organizationDTO>;
