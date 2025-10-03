import { formatDate } from 'date-fns';
import Link from 'next/link';

import { Badge } from '@/deps/shadcn/ui/badge';
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
import { type ArticleListItem } from '@/modules/article/api/procedures/list';
import { CreateArticleButton } from '@/modules/article/components/create-article-button';
import { typeToLabel } from '../../../utils/type-to-label';

export const HomePage = async () => {
	const articlesQuery = await api.article.list();

	const TableLabels = () => (
		<Labels>
			<Label>Title</Label>
			<Label>Type / Tags</Label>
			<Label>Date</Label>
			<ActionsLabel />
		</Labels>
	);

	const TableItems = (articles: ArticleListItem) => (
		<Items>
			{articles.articles.map((article) => {
				return (
					<Item key={article.id}>
						<Content>
							<Data strong className="flex flex-row items-center gap-3">
								<div className="w-8 h-8 bg-neutral-weak rounded-lg relative overflow-hidden">
									{article.coverImageUrl && (
										<img
											src={article.coverImageUrl}
											alt={article.title}
											className="w-full h-full object-cover"
										/>
									)}
								</div>
								{article.title}
							</Data>
							<Data className="flex flex-wrap gap-1">
								{article.companyVisibility && (
									<Badge variant="primary" theme="info">
										Company
									</Badge>
								)}
								{article.type && (
									<Badge variant="secondary">{typeToLabel(article.type)}</Badge>
								)}
								{article.tags.map((tag, index) => (
									<Badge variant="tertiary" key={index}>
										{tag}
									</Badge>
								))}
							</Data>
							<Data>
								{article.date ? formatDate(article.date, 'dd.MM.yyyy') : ''}
							</Data>
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
	);

	return (
		<div className="flex flex-col gap-10 items-center py-20 w-full text-neutral h-full overflow-y-scroll scrollbar-hidden">
			<div className="flex flex-row justify-between gap-10 w-full container-lg px-6">
				<h1 className="title-1 text-neutral">Articles</h1>
				<CreateArticleButton />
			</div>

			<div className="w-full container-lg px-6">
				<List>
					<p className="title-3 text-neutral">Unpublished</p>
					<TableLabels />
					<TableItems
						articles={articlesQuery.articles
							.filter((article) => !article.published)
							.sort(
								(a, b) =>
									new Date(b.date ?? '').getTime() -
									new Date(a.date ?? '').getTime()
							)}
					/>
				</List>
			</div>

			<div className="w-full container-lg px-6">
				<List>
					<p className="title-3 text-neutral">Published</p>
					<TableLabels />
					<TableItems
						articles={articlesQuery.articles
							.filter((article) => article.published)
							.sort(
								(a, b) =>
									new Date(b.date ?? '').getTime() -
									new Date(a.date ?? '').getTime()
							)}
					/>
				</List>
			</div>
		</div>
	);
};
