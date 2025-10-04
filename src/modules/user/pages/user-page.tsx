import { type FC } from 'react';

import { UserSitesList } from '../components/user-sites-list';
import { UserUpdateForm } from '../forms/user-update/user-update-form';

interface PageProps {
	params: Promise<{
		userId: string;
	}>;
}

export const UserPage: FC<PageProps> = async ({ params }) => {
	const { userId } = await params;

	return (
		<div className="flex flex-col gap-10 items-center w-full my-20">
			<div className="border border-neutral-weak rounded-md p-10 flex flex-col gap-6 container-md w-full">
				<div className="title-3 text-neutral">User</div>
				<UserUpdateForm userId={userId} />
			</div>

			<div className="border border-neutral-weak rounded-md p-10 flex flex-col gap-6 container-md w-full">
				<div className="title-3 text-neutral">Sites</div>
				<UserSitesList userId={userId} />
			</div>
		</div>
	);
};
