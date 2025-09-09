'use client';

import { type Editor } from '@tiptap/react';
import { useCallback } from 'react';

import { Badge } from '@/deps/shadcn/ui/badge';
import { Button } from '@/deps/shadcn/ui/button';
import { Spinner } from '@/global/components/spinner';

export const EditorToolbar = ({
	editor,
	isSaving
}: {
	editor: Editor;
	isSaving?: boolean;
}) => {
	const locked = false;

	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes('link').href as string;
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}, [editor]);

	const handleLink = useCallback(() => {
		if (editor.isActive('link')) {
			editor.chain().focus().unsetLink().run();
		} else {
			setLink();
		}
	}, [editor, setLink]);

	if (!editor) {
		return null;
	}

	return (
		<div className="sticky top-3 z-10 flex flex-row gap-3 px-3 py-2 rounded-md overflow-x-auto scrollbar-hidden bg-section">
			<div className="flex flex-row items-center flex-1">
				<div className="flex flex-row gap-3">
					<div className="flex flex-row gap-2">
						<Button
							size="xs"
							theme="neutral"
							variant={editor.isActive('bold') ? 'solid' : 'ghost'}
							singleIcon="text-bold"
							onClick={() => editor.chain().focus().toggleBold().run()}
							disabled={locked}
						/>
						<Button
							size="xs"
							theme="neutral"
							variant={editor.isActive('italic') ? 'solid' : 'ghost'}
							singleIcon="text-italic"
							onClick={() => editor.chain().focus().toggleItalic().run()}
							disabled={locked}
						/>
						<Button
							size="xs"
							theme="neutral"
							variant={editor.isActive('strike') ? 'solid' : 'ghost'}
							singleIcon="text-strikethrough"
							onClick={() => editor.chain().focus().toggleStrike().run()}
							disabled={locked}
						/>
					</div>

					<div className="self-stretch w-px bg-neutral-medium my-1" />

					<div className="flex flex-row gap-2">
						<Button
							size="xs"
							theme="neutral"
							variant={
								editor.isActive('heading', { level: 1 }) ? 'solid' : 'ghost'
							}
							singleIcon="heading-1"
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 1 }).run()
							}
							disabled={locked}
						/>
						<Button
							size="xs"
							theme="neutral"
							variant={
								editor.isActive('heading', { level: 2 }) ? 'solid' : 'ghost'
							}
							singleIcon="heading-2"
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 2 }).run()
							}
							disabled={locked}
						/>
						<Button
							size="xs"
							theme="neutral"
							variant={
								editor.isActive('heading', { level: 3 }) ? 'solid' : 'ghost'
							}
							singleIcon="heading-3"
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 3 }).run()
							}
							disabled={locked}
						/>
					</div>

					<div className="self-stretch w-px bg-neutral-medium my-1" />

					<div className="flex flex-row gap-2">
						<Button
							size="xs"
							theme="neutral"
							variant={editor.isActive('link') ? 'solid' : 'ghost'}
							singleIcon="link"
							onClick={handleLink}
							disabled={locked}
						/>
					</div>

					<div className="self-stretch w-px bg-neutral-medium my-1" />

					<div className="flex flex-row gap-2">
						<Button
							size="xs"
							theme="neutral"
							variant="ghost"
							singleIcon="images"
							disabled={locked}
							onClick={() => {
								editor
									.chain()
									.focus()
									.insertContent({
										type: 'galleryGrid',
										content: []
									})
									.insertContent({
										type: 'paragraph',
										content: []
									})
									.run();
							}}
						/>
						<Button
							size="xs"
							theme="neutral"
							variant="ghost"
							singleIcon="image-text"
							disabled={locked}
							onClick={() => {
								editor
									.chain()
									.focus()
									.insertContent({
										type: 'imageText',
										attrs: { src: '' },
										content: [
											{
												type: 'paragraph',
												content: []
											}
										]
									})
									.insertContent({
										type: 'paragraph',
										content: []
									})
									.run();
							}}
						/>
						<Button
							size="xs"
							theme="neutral"
							variant="ghost"
							singleIcon="list-board"
							disabled={locked}
							onClick={() => {
								editor
									.chain()
									.focus()
									.insertContent({
										type: 'priceList',
										content: [
											{
												type: 'priceListItem',
												attrs: { name: '', description: '', price: '' }
											}
										]
									})
									.insertContent({
										type: 'paragraph',
										content: []
									})
									.run();
							}}
						/>
						<Button
							size="xs"
							theme="neutral"
							variant="ghost"
							singleIcon="users"
							disabled={locked}
							onClick={() => {
								console.log('Inserting doctor list component');
								editor
									.chain()
									.focus()
									.insertContent({
										type: 'doctorList',
										attrs: { ids: '' }
									})
									.run();
							}}
						/>
					</div>
				</div>
			</div>

			{isSaving ? (
				<Badge variant="tertiary">
					Saving <Spinner className="size-3 border-neutral-strong" />
				</Badge>
			) : (
				<Badge variant="tertiary">Saved</Badge>
			)}
		</div>
	);
};
