'use client';

import { EditorContent } from '@tiptap/react';
import { type FC } from 'react';

import { Spinner } from '@/global/components/spinner';
import { EditorToolbar } from '../../components/editor/editor-toolbar';
import { ArticleProvider } from '../../contexts/use-article';
import { useArticleForm } from './use-article-form';

export const ArticleForm: FC<{ articleId: string }> = ({ articleId }) => {
	const { editor, isSaving } = useArticleForm(articleId);

	if (!editor) {
		return <Spinner className="border-neutral-medium" />;
	}

	return (
		<ArticleProvider articleId={articleId}>
			<div className="flex flex-col gap-6">
				<EditorToolbar editor={editor} isSaving={isSaving} />
				<div className="px-6">
					<EditorContent editor={editor} />
				</div>
			</div>
		</ArticleProvider>
	);
};
