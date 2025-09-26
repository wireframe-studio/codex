'use client';

import { type JSONContent, useEditor } from '@tiptap/react';
import { useEffect, useState } from 'react';

import { tiptapExtensionsEditable } from '@/deps/tiptap/extensions';
import { api } from '@/deps/trpc/react';
import { useDebouncedEffect } from '@/global/hooks/use-debounced-effect';

export const useArticleContentForm = (articleId: string) => {
	// APIs
	const updateContent = api.article.content.update.useMutation();
	const remoteArticle = api.article.get.useQuery({
		articleId
	});
	const utils = api.useUtils();

	// Local content
	const [localContent, setLocalContent] = useState<JSONContent | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [_contentKey, setContentKey] = useState(0);

	const editor = useEditor({
		// immediatelyRender: true,
		extensions: tiptapExtensionsEditable,
		// editable: remoteArticle.isLoading,
		editorProps: {
			attributes: {
				class:
					'rounded-lg border border-neutral-medium outline-none flex flex-col gap-2 p-6'
			}
		},
		onBlur: () => {},
		onUpdate({ editor }) {
			setContentKey((prev) => prev + 1);
			setIsSaving(true);
			setLocalContent(editor.getJSON());
		}
	});

	// Remote content
	const remoteContent = remoteArticle.data?.content as JSONContent;

	// Update editor with remote content
	useEffect(() => {
		if (!editor) return;

		// flushSync error fix
		Promise.resolve().then(() => {
			editor.commands.setContent(remoteContent);
		});
	}, [editor, remoteContent]);

	// Saving
	const updateArticleContent = async (content: JSONContent | null) => {
		console.log('_contentKey', _contentKey);

		if (_contentKey === 0) return;

		console.log(content);

		await updateContent.mutateAsync({
			articleId,
			content: content
		});

		utils.article.get.invalidate({ articleId });

		setIsSaving(false);
	};

	useDebouncedEffect(
		() => {
			updateArticleContent(localContent);
		},
		[localContent],
		1000
	);

	return { editor, isSaving };
};
