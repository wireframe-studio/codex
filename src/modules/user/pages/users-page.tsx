import { UsersList } from '../components/users-list';

export const UsersPage = () => {
	return (
		<div className="flex flex-col gap-10 items-center">
			<div className="bg-section rounded-md p-10 flex flex-col gap-6">
				<UsersList />
			</div>
		</div>
	);
};
