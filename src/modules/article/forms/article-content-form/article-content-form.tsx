'use client';

import { EditorContent } from '@tiptap/react';

import { Spinner } from '@/global/components/spinner';
import { EditorToolbar } from '../../components/editor/editor-toolbar';
import { ArticleProvider, useArticle } from '../../contexts/use-article';
import { useArticleContentForm } from './use-article-content-form';

export const ArticleContentForm = () => {
	const { articleId } = useArticle();
	const { editor, isSaving } = useArticleContentForm(articleId);

	if (!editor) {
		return <Spinner className="border-neutral-medium" />;
	}

	return (
		<ArticleProvider articleId={articleId}>
			<div className="flex flex-col gap-6 w-full">
				<EditorToolbar editor={editor} isSaving={isSaving} />
				<div className="px-6">
					<EditorContent editor={editor} />
				</div>
			</div>
		</ArticleProvider>
	);
};
