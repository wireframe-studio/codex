'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { ThemeToggler } from '@/deps/tailwind/theme/components/theme-toggler';
import { api } from '@/deps/trpc/react';
import { useEffect, useState } from 'react';
import { useEditorLayout } from './editor-layout-context';

const useSidebar = () => {
	const articleList = api.article.list.useQuery();
	const createArticle = api.article.create.useMutation();
	const utils = api.useUtils();

	const { setArticleId, articleId } = useEditorLayout();

	const [expanded, setExpanded] = useState(false);

	// load expanded from local storage
	useEffect(() => {
		const expanded = localStorage.getItem('expanded');
		if (expanded) {
			setExpanded(expanded === 'true');
		}
	}, []);

	// save expanded to local storage
	useEffect(() => {
		localStorage.setItem('expanded', expanded.toString());
	}, [expanded]);

	const handleCreateArticle = async () => {
		const article = await createArticle.mutateAsync();
		utils.article.list.invalidate();
		setArticleId(article.article.id);
	};

	return {
		articleList,
		setExpanded,
		expanded,
		setArticleId,
		articleId,
		handleCreateArticle
	};
};

export const Sidebar = () => {
	const {
		articleList,
		setExpanded,
		expanded,
		setArticleId,
		articleId,
		handleCreateArticle
	} = useSidebar();

	const Header = () => {
		return (
			<div className="flex flex-row justify-between items-center px-2 py-4">
				<h1 className="title-2 text-neutral">Codex</h1>
				<Button
					variant="ghost"
					onClick={() => setExpanded(!expanded)}
					singleIcon="sidebar"
				/>
			</div>
		);
	};

	if (!expanded)
		return (
			<div
				className={cn(
					'flex flex-col gap-4',
					'h-full self-stretch',
					'px-2 py-4',
					'bg-section border-r border-r-neutral-medium'
				)}>
				<Button
					variant="ghost"
					onClick={() => setExpanded(!expanded)}
					singleIcon="sidebar"
				/>
				<Button
					variant="solid-weak"
					onClick={handleCreateArticle}
					singleIcon="add-circle"
				/>
				<ThemeToggler />
			</div>
		);

	return (
		<div
			className={cn(
				'flex flex-col',
				'gap-4',
				'h-full self-stretch',
				'bg-section border-r border-r-neutral-medium'
			)}>
			<Header />

			<div className="px-2">
				<Button
					variant="solid-weak"
					onClick={handleCreateArticle}
					rightIcon="add-circle">
					Create Article
				</Button>
			</div>

			<div className="flex-1 px-2 overflow-y-scroll scrollbar-hidden flex flex-col">
				{articleList.data?.articles.map((article) => (
					<div
						key={article.id}
						className={cn(
							'body-2 text-neutral-strong hover:text-neutral',
							'px-3 py-2 rounded-md cursor-pointer',
							'border border-transparent',
							articleId === article.id &&
								'bg-neutral-weak border-neutral-medium text-neutral'
						)}
						onClick={() => setArticleId(article.id)}>
						{article.title}
					</div>
				))}
			</div>
		</div>
	);
};
