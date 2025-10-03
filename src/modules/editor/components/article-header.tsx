'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { Icon } from '@/global/components/icon';
import { useArticle } from '@/modules/article/contexts/use-article';
import { useLocalStorage } from '@/utils/use-local-storage';
import Link from 'next/link';
import { ArticleImagesForm } from '../forms/article-images-form';
import { ArticleMetadataUpdateForm } from '../forms/article-metadata-update/article-metadata-update-form';
import { ArticleAnalyticsCard } from './article-analytics';

export const ArticleHeader = () => {
	const { articleId, article } = useArticle();

	// collapsing
	const [showImages, setShowImages] = useLocalStorage('show-images', false);
	const [showMetadata, setShowMetadata] = useLocalStorage(
		'show-metadata',
		true
	);
	const [showAnalytics, setShowAnalytics] = useLocalStorage(
		'show-analytics',
		false
	);

	const ArticleInfo = () => {
		return (
			<div className="flex flex-row gap-2 justify-between px-6 py-6">
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-1 items-center">
						<Link href="/">
							<p className="caption text-neutral-strong">Articles</p>
						</Link>
						<Icon icon="chevron-right" className="bg-neutral-medium size-5" />
						<p className="caption text-neutral-strong">{article.id}</p>
					</div>
					<h1 className="title-2 text-neutral">{article.title}</h1>
					<h1 className="title-2 text-neutral-strong">{article.description}</h1>
				</div>

				<div className="flex flex-row gap-2">
					<Button
						variant={showImages ? 'solid' : 'solid-weak'}
						singleIcon="image"
						onClick={() => setShowImages((showImages) => !showImages)}
					/>
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
		<div className="flex flex-col gap-1 container-lg">
			<ArticleInfo />

			{showImages && articleId && (
				<div className="p-4 bg-section rounded-lg mx-6">
					<ArticleImagesForm />
				</div>
			)}

			{showMetadata && articleId && (
				<div className="p-4 bg-section rounded-lg mx-6">
					<ArticleMetadataUpdateForm />
				</div>
			)}

			{showAnalytics && articleId && (
				<div className="p-4 bg-section rounded-lg mx-6">
					<ArticleAnalyticsCard />
				</div>
			)}
		</div>
	);
};
