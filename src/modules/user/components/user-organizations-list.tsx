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

export const UserOrganizationsList: FC<{ userId: string }> = ({ userId }) => {
	const userQuery = api.organization.listByUserId.useQuery({ userId });

	if (!userQuery.data) return <Spinner />;

	const organizations = userQuery.data?.organizations;

	return (
		<List>
			<Labels>
				<Label>Name</Label>
				<ActionsLabel />
			</Labels>

			<Items>
				{organizations.map((organization) => (
					<Item key={organization.id}>
						<Data>{organization.name}</Data>
						<Data>{organization.webhookUrl}</Data>
					</Item>
				))}
			</Items>
		</List>
	);
};
