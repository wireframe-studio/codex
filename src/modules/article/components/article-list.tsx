import { Badge } from '@/deps/shadcn/ui/badge';
import { Button } from '@/deps/shadcn/ui/button';
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
import { typeToLabel } from '@/utils/type-to-label';
import { formatDate } from 'date-fns';
import Link from 'next/link';
import { ArticleListItem } from '../api/procedures/list';

export const ArticleList = (articles: ArticleListItem) => (
	<List>
		<p className="title-3 text-neutral">Unpublished</p>

		<Labels>
			<Label>Title</Label>
			<Label>Type / Tags</Label>
			<Label>Date</Label>
			<ActionsLabel />
		</Labels>
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
	</List>
);
