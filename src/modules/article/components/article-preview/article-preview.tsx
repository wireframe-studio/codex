'use client';

import { Spinner } from '@/global/components/spinner';
import { EditorContent, JSONContent } from '@tiptap/react';
import { type FC } from 'react';
import { useArticlePreview } from './use-article-preview';

export const ArticlePreview: FC<{
	articleId: string;
	content?: JSONContent;
}> = ({ articleId, content }) => {
	const { editor, isLoading } = useArticlePreview(articleId, content);

	if (isLoading) {
		return <Spinner className="border-neutral-medium" />;
	}

	return (
		// <div className="">
		<EditorContent editor={editor} className="w-full mb-20" />
		// </div>
	);
};
