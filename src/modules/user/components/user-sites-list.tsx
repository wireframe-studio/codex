'use client';

import { type FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/react';
import {
	Actions,
	ActionsLabel,
	Data,
	Item,
	Items,
	Label,
	Labels,
	List
} from '@/global/components/list';
import { Spinner } from '@/global/components/spinner';
import Link from 'next/link';

export const UserSitesList: FC<{ userId: string }> = ({ userId }) => {
	const userQuery = api.site.listByUserId.useQuery({ userId });

	if (!userQuery.data) return <Spinner />;

	const sites = userQuery.data?.sites;

	return (
		<List>
			<Labels>
				<Label>Name</Label>
				<ActionsLabel />
			</Labels>

			<Items>
				{sites.map((site) => (
					<Item key={site.id}>
						<Data>{site.name}</Data>
						<Data>{site.webhookUrl}</Data>
						<Actions>
							<Link href={`/sites/${site.id}`}>
								<Button singleIcon="arrow-right" size="sm" variant="ghost" />
							</Link>
						</Actions>
					</Item>
				))}
			</Items>
		</List>
	);
};
