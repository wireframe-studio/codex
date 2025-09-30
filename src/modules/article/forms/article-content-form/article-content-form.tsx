'use client';

import { DragHandle } from '@tiptap/extension-drag-handle-react';
import { EditorContent } from '@tiptap/react';

import { Button } from '@/deps/shadcn/ui/button';
import { Spinner } from '@/global/components/spinner';
import { EditorToolbar } from '../../components/editor-toolbar';
import { ArticleProvider, useArticle } from '../../contexts/use-article';
import { useArticleContentForm } from './use-article-content-form';

// A simple HTML pretty-printer: each tag on a new line, with indentation.
const indentHTML = (html: string) => {
	let result = '';
	let indent = 0;
	const INDENT_STR = '\t';

	// Split by tags, keeping tags and text nodes
	const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);

	for (let token of tokens) {
		if (/^<\/[^>]+>$/.exec(token)) {
			// Closing tag: dedent, then print
			indent = Math.max(indent - 1, 0);
			result += INDENT_STR.repeat(indent) + token + '\n';
		} else if (/^<[^/!][^>]*>$/.exec(token)) {
			// Opening tag (not closing, not comment, not doctype)
			result += INDENT_STR.repeat(indent) + token + '\n';
			indent++;
		} else if (/^<[^>]+\/>$/.exec(token)) {
			// Self-closing tag
			result += INDENT_STR.repeat(indent) + token + '\n';
		} else if (token.trim() !== '') {
			// Text node (non-empty)
			result += INDENT_STR.repeat(indent) + token.trim() + '\n';
		}
	}
	return result.trim();
};

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

				<DragHandle editor={editor}>
					<Button singleIcon="drag" variant="ghost" size="xs" />
				</DragHandle>

				<EditorContent
					className="outline-none w-full tiptap-editor"
					editor={editor}
				/>

				{/* <pre className="body-3 text-neutral-strong">
					{indentHTML(
						JSON.stringify(editor.getHTML(), null, 2)
							.slice(1)
							.slice(0, -1)
							.replaceAll('\\"', '"')
					)}
				</pre> */}
			</div>
		</ArticleProvider>
	);
};
