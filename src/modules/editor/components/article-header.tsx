'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { useArticle } from '@/modules/article/contexts/use-article';
import { useState } from 'react';
import { ArticleMetadataUpdateForm } from '../forms/article-metadata-update/article-metadata-update-form';

const ArticleAnalyticsCard = () => {
	return (
		<div className="grid grid-cols-2 gap-2 p-4 bg-section rounded-md">
			<div className="text-neutral caption">Views</div>
			<input className="text-neutral input" type="number" placeholder="Views" />

			<div className="text-neutral caption">Reactions</div>
			<input
				className="text-neutral input"
				type="number"
				placeholder="Reactions"
			/>
		</div>
	);
};

export const ArticleHeader = () => {
	const { articleId, article } = useArticle();

	// collapsing
	const [showMetadata, setShowMetadata] = useState(true);
	const [showAnalytics, setShowAnalytics] = useState(false);

	const ArticleInfo = () => {
		return (
			<div className="flex flex-row gap-2 justify-between px-6 py-6">
				<div className="flex flex-col gap-2">
					<p className="caption text-neutral-strong">{article.id}</p>
					<h1 className="title-2 text-neutral">{article.title}</h1>
					<h1 className="title-2 text-neutral-strong">{article.description}</h1>
				</div>

				<div className="flex flex-row gap-2">
					<Button
						variant={showMetadata ? 'solid' : 'solid-weak'}
						singleIcon="edit"
						onClick={() => setShowMetadata((showMetadata) => !showMetadata)}
					/>
					<Button
						variant={showAnalytics ? 'solid' : 'solid-weak'}
						singleIcon="chart-bar"
						onClick={() => setShowAnalytics((showAnalytics) => !showAnalytics)}
					/>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-1">
			<ArticleInfo />

			{showMetadata && articleId && (
				<div className="p-4 bg-section rounded-md mx-6">
					<ArticleMetadataUpdateForm />
				</div>
			)}

			{showAnalytics && (
				<div className="p-4 bg-section rounded-md mx-6">
					<ArticleAnalyticsCard />
				</div>
			)}
		</div>
	);
};
