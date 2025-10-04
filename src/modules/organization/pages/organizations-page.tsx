import { OrganizationsList } from '../components/organizations-list';

export const OrganizationsPage = () => {
	return (
		<div className="flex flex-col gap-10 items-center">
			<div className="bg-section rounded-md p-10 flex flex-col gap-6">
				<OrganizationsList />
			</div>
		</div>
	);
};
