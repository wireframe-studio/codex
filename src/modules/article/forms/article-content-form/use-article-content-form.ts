'use client';

import { type JSONContent, useEditor } from '@tiptap/react';
import { useEffect, useState } from 'react';

import { extensions } from '@/deps/tiptap/extensions';
import { api } from '@/deps/trpc/react';
import { useDebouncedEffect } from '@/global/hooks/use-debounced-effect';

export const useArticleContentForm = (articleId: string) => {
	// APIs
	const updateContent = api.article.content.update.useMutation();
	const remoteArticle = api.article.content.get.useQuery({
		articleId
	});
	const utils = api.useUtils();

	// Local content
	const [localContent, setLocalContent] = useState<JSONContent | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [_contentKey, setContentKey] = useState(0);

	const editor = useEditor({
		// immediatelyRender: true,
		extensions: extensions,
		editable: true,
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
