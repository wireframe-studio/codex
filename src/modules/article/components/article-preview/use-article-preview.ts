import { api } from '@/deps/trpc/react';
import { JSONContent, useEditor } from '@tiptap/react';

import { tiptapExtensionsViewable } from '@/deps/tiptap/extensions';
import { useEffect } from 'react';

export const useArticlePreview = (articleId: string, content?: JSONContent) => {
	// APIs
	const remoteArticle = api.article.get.useQuery(
		{
			articleId
		},
		{
			enabled: !content
		}
	);

	// Remote content
	const remoteContent = content ?? (remoteArticle.data?.content as JSONContent);

	const editor = useEditor({
		immediatelyRender: false,
		extensions: tiptapExtensionsViewable,
		editable: false,
		editorProps: {
			attributes: {
				class:
					'rounded-md outline-none flex flex-col gap-2 w-full items-center tiptap-viewer'
			}
		}
	});

	// Update editor with remote content
	useEffect(() => {
		if (!editor || !remoteContent) return;

		// flushSync error fix
		Promise.resolve().then(() => {
			editor.commands.setContent(remoteContent);
		});
	}, [editor, remoteContent]);

	return {
		editor,
		isLoading: !!content ? !editor || remoteArticle.isLoading : false
	};
};
