'use client';

import { api } from '@/deps/trpc/react';

import { Button } from '@/deps/shadcn/ui/button';
import { useRouter } from 'next/navigation';

export const CreateArticleButton = () => {
	const createArticle = api.article.create.useMutation();
	const utils = api.useUtils();
	const router = useRouter();

	const handleCreateArticle = async () => {
		const article = await createArticle.mutateAsync();
		utils.article.list.invalidate();
		router.push(`/article/${article.article.id}`);
	};

	return (
		<Button
			variant="solid-weak"
			rightIcon="add-circle"
			loading={createArticle.isPending}
			onClick={handleCreateArticle}>
			Create Article
		</Button>
	);
};
