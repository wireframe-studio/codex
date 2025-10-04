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

export const SiteUsersList: FC<{ siteId: string }> = ({ siteId }) => {
	const userQuery = api.user.listBySiteId.useQuery({ siteId });

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
						<Actions>
							<Link href={`/users/${user.id}`}>
								<Button singleIcon="arrow-right" size="sm" variant="ghost" />
							</Link>
						</Actions>
					</Item>
				))}
			</Items>
		</List>
	);
};
