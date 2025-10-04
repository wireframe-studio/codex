'use client';

import { type FC } from 'react';

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

export const OrganizationUsersList: FC<{ organizationId: string }> = ({
	organizationId
}) => {
	const userQuery = api.user.listByOrganizationId.useQuery({ organizationId });

	if (!userQuery.data) return <Spinner />;

	const users = userQuery.data?.users;

	return (
		<List>
			<Labels>
				<Label>Name</Label>
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
