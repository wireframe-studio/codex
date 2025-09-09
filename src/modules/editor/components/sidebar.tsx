'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { ThemeToggler } from '@/deps/tailwind/theme/components/theme-toggler';
import { api } from '@/deps/trpc/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const Sidebar = () => {
	const articleList = api.article.list.useQuery();
	const createArticle = api.article.create.useMutation();
	const utils = api.useUtils();

	const router = useRouter();

	const [expanded, setExpanded] = useState(true);

	const handleCreateArticle = async () => {
		const article = await createArticle.mutateAsync();
		utils.article.list.invalidate();
		router.push(`/article/${article.article.id}`);
	};

	const pathname = usePathname();

	// Extract articleId from pathname like "/article/123" -> "123"
	const selectedArticleId = pathname.startsWith('/article/')
		? pathname.split('/')[2]
		: null;

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
					<Link
						href={`/article/${article.id}`}
						key={article.id}
						className={cn(
							'body-2 text-neutral-strong hover:text-neutral',
							'px-3 py-2 rounded-md cursor-pointer',
							'border border-transparent',
							selectedArticleId === article.id &&
								'bg-neutral-weak border-neutral-medium text-neutral'
						)}>
						{article.title}
					</Link>
				))}
			</div>
		</div>
	);
};
