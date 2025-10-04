'use client';

import { api } from '@/deps/trpc/react';
import {
	ActionsLabel,
	Data,
	Item,
	Items,
	Label,
	Labels,
	List
} from '@/global/components/list';
import { Spinner } from '@/global/components/spinner';

export const UsersList = () => {
	const usersQuery = api.user.list.useQuery();

	if (!usersQuery.data) return <Spinner />;

	const users = usersQuery.data?.users;

	return (
		<List>
			<Labels>
				<Label>Name</Label>
				<Label>Email</Label>
				<ActionsLabel />
			</Labels>

			<Items>
				{users.map((user) => (
					<Item key={user.id}>
						<Data>{user.name}</Data>
						<Data>{user.email}</Data>
					</Item>
				))}
			</Items>
		</List>
	);
};
