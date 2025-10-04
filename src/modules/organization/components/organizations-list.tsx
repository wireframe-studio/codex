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

export const OrganizationsList = () => {
	const organizationsQuery = api.organization.list.useQuery();

	if (!organizationsQuery.data) return <Spinner />;

	const organizations = organizationsQuery.data?.organizations;

	return (
		<List>
			<Labels>
				<Label>Name</Label>
				<Label>Webhook URL</Label>
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
