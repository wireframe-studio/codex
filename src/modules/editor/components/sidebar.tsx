'use client';

import { Button } from '@/deps/shadcn/ui/button';
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

	const selectedArticleId = pathname.startsWith('/article/')
		? pathname.split('/')[2]
		: null;

	// Collapsed view
	if (!expanded) {
		return (
			<div className="m-6">
				<Button
					variant="ghost"
					onClick={() => setExpanded(!expanded)}
					singleIcon="sidebar"
				/>
			</div>
		);
	}

	// Expanded view
	return (
		<div className="flex flex-col gap-4 self-stretch shrink-0 w-[240px] m-2 border rounded-xl border-neutral-medium bg-section">
			{/* Header */}
			<div className="flex flex-row justify-between items-center px-4 py-4">
				<h1 className="title-2 text-neutral">Codex</h1>
				<Button
					variant="ghost"
					onClick={() => setExpanded(false)}
					singleIcon="sidebar"
				/>
			</div>

			<div className="px-2">
				<Button
					variant="outline"
					onClick={handleCreateArticle}
					rightIcon="add-circle"
					className="w-full">
					Create Article
				</Button>
			</div>

			{/* Article List */}
			<div className="flex-1 px-1 overflow-y-scroll scrollbar-hidden flex flex-col">
				{articleList.data?.articles.map((article) => {
					const isSelected = selectedArticleId === article.id;

					return (
						<Link href={`/article/${article.id}`} key={article.id}>
							<Button
								variant={isSelected ? 'solid-weak' : 'ghost'}
								className="w-full justify-start">
								{article.title}
							</Button>
						</Link>
					);
				})}
			</div>

			<div className="p-2">
				<ThemeToggler className="w-full" variant="solid-weak" />
			</div>
		</div>
	);
};
