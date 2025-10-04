import { api } from '@/deps/trpc/server';
import { ArticleList } from '@/modules/article/components/article-list';
import { CreateArticleButton } from '@/modules/article/components/create-article-button';

export const HomePage = async () => {
	const articlesQuery = await api.article.list();

	return (
		<div className="flex flex-col gap-10 items-center py-20 w-full text-neutral h-full overflow-y-scroll scrollbar-hidden">
			<div className="flex flex-row justify-between gap-10 w-full container-lg px-6">
				<h1 className="title-1 text-neutral">Articles</h1>
				<CreateArticleButton />
			</div>

			<div className="w-full container-lg px-6">
				<ArticleList
					articles={articlesQuery.articles
						.filter((article) => !article.published)
						.sort(
							(a, b) =>
								new Date(b.date ?? '').getTime() -
								new Date(a.date ?? '').getTime()
						)}
				/>
			</div>

			<div className="w-full container-lg px-6">
				<ArticleList
					articles={articlesQuery.articles
						.filter((article) => article.published)
						.sort(
							(a, b) =>
								new Date(b.date ?? '').getTime() -
								new Date(a.date ?? '').getTime()
						)}
				/>
			</div>
		</div>
	);
};
