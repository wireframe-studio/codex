import { type FC } from 'react';
import { SiteUsersList } from '../components/site-users-list';
import { SiteUpdateForm } from '../forms/site-update/site-update-form';

interface PageProps {
	params: Promise<{
		siteId: string;
	}>;
}

export const SitePage: FC<PageProps> = async ({ params }) => {
	const { siteId } = await params;

	return (
		<div className="flex flex-col gap-10 items-center w-full my-20">
			<div className="border border-neutral-weak rounded-md p-10 flex flex-col gap-6 container-md w-full">
				<div className="title-3 text-neutral">Site</div>
				<SiteUpdateForm siteId={siteId} />
			</div>

			<div className="border border-neutral-weak rounded-md p-10 flex flex-col gap-6 container-md w-full">
				<div className="title-3 text-neutral">Users</div>
				<SiteUsersList siteId={siteId} />
			</div>
		</div>
	);
};
