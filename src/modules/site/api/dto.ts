import { type Site } from '@prisma/client';

export const siteDTO = (site: Site) => ({
	id: site.id,
	name: site.name,
	webhookUrl: site.webhookUrl,
	createdAt: site.createdAt
});

export type SiteDTO = ReturnType<typeof siteDTO>;
