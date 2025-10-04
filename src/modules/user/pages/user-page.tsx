import { type FC } from 'react';

import { UserOrganizationsList } from '../components/user-organizations-list';
import { UserUpdateForm } from '../forms/user-update/user-update-form';

interface PageProps {
	params: Promise<{
		userId: string;
	}>;
}

export const UserPage: FC<PageProps> = async ({ params }) => {
	const { userId } = await params;

	return (
		<div className="flex flex-col gap-10 items-center">
			<div className="bg-section rounded-md p-10 flex flex-col gap-6">
				<div className="title-3 text-neutral">User</div>
				<UserUpdateForm userId={userId} />
			</div>

			<div className="bg-section rounded-md p-10 flex flex-col gap-6">
				<div className="title-3 text-neutral">Organizations</div>
				<UserOrganizationsList userId={userId} />
			</div>
		</div>
	);
};
