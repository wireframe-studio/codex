import { type FC } from 'react';
import { OrganizationUsersList } from '../components/organization-users-list';
import { OrganizationUpdateForm } from '../forms/organization-update/organization-update-form';

interface PageProps {
	params: Promise<{
		organizationId: string;
	}>;
}

export const OrganizationPage: FC<PageProps> = async ({ params }) => {
	const { organizationId } = await params;

	return (
		<div className="flex flex-col gap-10 items-center">
			<div className="bg-section rounded-md p-10 flex flex-col gap-6">
				<div className="title-3 text-neutral">Organization</div>
				<OrganizationUpdateForm organizationId={organizationId} />
			</div>

			<div className="bg-section rounded-md p-10 flex flex-col gap-6">
				<div className="title-3 text-neutral">Users</div>
				<OrganizationUsersList organizationId={organizationId} />
			</div>
		</div>
	);
};
