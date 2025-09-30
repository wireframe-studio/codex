import { formatDate } from 'date-fns';
import Link from 'next/link';

import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/server';
import {
	Actions,
	ActionsLabel,
	Content,
	Data,
	Item,
	Items,
	Label,
	Labels,
	List
} from '@/global/components/list';
import { CreateArticleButton } from '@/modules/article/components/create-article-button';

export const HomePage = async () => {
	const articlesQuery = await api.article.list();

	return (
		<div className="flex flex-col gap-10 items-center py-20 w-full text-neutral">
			<div className="flex flex-row justify-between gap-10 w-full container-md px-6">
				<h1 className="title-1 text-neutral">Articles</h1>
				<CreateArticleButton />
			</div>

			<div className="w-full container-md px-6">
				<List>
					<p className="title-3 text-neutral">Unpublished</p>
					<Labels>
						<Label>Title</Label>
						<Label>Type</Label>
						<Label>Date</Label>
						<ActionsLabel />
					</Labels>
					<Items>
						{articlesQuery.articles
							.filter((article) => !article.published)
							.map((article) => {
								return (
									<Item key={article.id}>
										<Content>
											<Data>{article.title}</Data>
											<Data>{article.type}</Data>
											<Data>
												{article.date
													? formatDate(article.date, 'dd.MM.yyyy')
													: ''}
											</Data>
											<Data>{article.views}</Data>
											<Actions>
												<Link href={`/article/${article.id}`}>
													<Button variant="ghost" singleIcon="edit" />
												</Link>
											</Actions>
										</Content>
									</Item>
								);
							})}
					</Items>
				</List>
			</div>

			<div className="w-full container-md px-6">
				<List>
					<p className="title-3 text-neutral">Published</p>
					<Labels>
						<Label>Title</Label>
						<Label>Type</Label>
						<Label>Date</Label>
						<ActionsLabel />
					</Labels>
					<Items>
						{articlesQuery.articles
							.filter((article) => article.published)
							.map((article) => {
								return (
									<Item key={article.id}>
										<Content>
											<Data>{article.title}</Data>
											<Data>{article.type}</Data>
											<Data>
												{article.date
													? formatDate(article.date, 'dd.MM.yyyy')
													: ''}
											</Data>
											<Data>{article.views}</Data>
											<Actions>
												<Link href={`/article/${article.id}`}>
													<Button variant="ghost" singleIcon="edit" />
												</Link>
											</Actions>
										</Content>
									</Item>
								);
							})}
					</Items>
				</List>
			</div>
		</div>
	);
};
