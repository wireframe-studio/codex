'use client';

import { useArticle } from '@/modules/article/contexts/use-article';

export const ArticleAnalyticsCard = () => {
	const { article } = useArticle();

	return (
		<div className="grid grid-cols-2 gap-2 p-4">
			<div className="caption text-neutral">Views</div>
			<p className="body-3 text-neutral">{article.views}</p>

			<p className="caption text-neutral">Reactions</p>
			<p className="body-3 text-neutral">{article.reactions}</p>
		</div>
	);
};
