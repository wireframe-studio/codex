'use client';

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

export const SitesList = () => {
	const sitesQuery = api.site.list.useQuery();

	if (!sitesQuery.data) return <Spinner />;

	const sites = sitesQuery.data?.sites;

	return (
		<List>
			<Labels>
				<Label>Name</Label>
				<Label>Webhook URL</Label>
				<ActionsLabel />
			</Labels>

			<Items>
				{sites.map((site) => (
					<Item key={site.id}>
						<Data>{site.name}</Data>
						<Data>{site.webhookUrl}</Data>
						<Actions>
							<Link href={`/sites/${site.id}`}>
								<Button singleIcon="edit" size="sm" variant="ghost" />
							</Link>
						</Actions>
					</Item>
				))}
			</Items>
		</List>
	);
};
