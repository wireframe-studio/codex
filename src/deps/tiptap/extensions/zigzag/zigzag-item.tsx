'use client';

import {
	type Attribute,
	mergeAttributes,
	Node,
	NodeViewWrapper,
	ReactNodeViewRenderer
} from '@tiptap/react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { useUploadDialog } from '@/modules/file/hooks/use-upload-dialog';
import { useEffect, useRef, useState } from 'react';

// ---

const nodeName = 'zigzagItem';

const defaultAttributes = {
	imageId: '',
	imageUrl: '',
	text: 'Hello',
	align: 'left' as 'left' | 'right'
};

// ---

const extension = Node.create({
	name: nodeName,

	group: 'block',
	content: '',
	atom: true,

	selectable: true,
	draggable: true,

	// default attrs
	addAttributes() {
		const keys = Object.keys(
			defaultAttributes
		) as (keyof typeof defaultAttributes)[];

		return keys.reduce((acc, key) => {
			acc[key] = { default: defaultAttributes[key] };
			return acc;
		}, {} as Record<keyof typeof defaultAttributes, Attribute>);
	},

	// parse // input HTML -> attrs
	parseHTML() {
		return [
			{
				tag: `div[data-type="${nodeName}"]`,
				getAttrs: (dom) => {
					const keys = Object.keys(
						defaultAttributes
					) as (keyof typeof defaultAttributes)[];

					return keys.reduce((acc, key) => {
						const value = dom.getAttribute(`data-${key}`) as any;
						acc[key] = value ?? defaultAttributes[key];
						return acc;
					}, defaultAttributes);
				}
			}
		];
	},

	// serilize // attrs -> output HTML
	renderHTML({ node, HTMLAttributes }) {
		const attrs = node.attrs as typeof defaultAttributes;

		const keys = Object.keys(attrs) as (keyof typeof defaultAttributes)[];

		const dataAttributes = keys.reduce((acc, key) => {
			acc[`data-${key}`] = attrs[key] ?? defaultAttributes[key];
			return acc;
		}, {} as Record<string, string>);

		return [
			'div',
			mergeAttributes(HTMLAttributes, {
				'data-type': nodeName,
				...dataAttributes
			})
		];
	},

	// react view // attrs -> React
	addNodeView() {
		return ReactNodeViewRenderer(
			({ editor, node, updateAttributes, deleteNode, selected, getPos }) => {
				const { imageId, align, text, imageUrl } =
					node.attrs as typeof defaultAttributes;

				const pos = getPos();
				const resolvedPos = editor.state.doc.resolve(pos);
				const currentIndex = resolvedPos.index();
				const parent = resolvedPos.parent;
				const isFirst = currentIndex === 0;
				const isLast = currentIndex === parent.childCount - 1;

				const makeContentUploadUrl =
					api.file.makeContentUploadUrl.useMutation();
				const registerFile = api.file.registerFile.useMutation();
				const deleteFile = api.file.deleteFileById.useMutation();

				const downloadUrl = api.file.getFileDownloadUrl.useQuery(
					{ fileId: imageId },
					{ enabled: !!imageId }
				);

				const hasFile = !!imageId;

				const { openUploadDialog } = useUploadDialog();

				const [isLoading, setIsLoading] = useState(false);

				const handleUpload = () => {
					openUploadDialog(async (files) => {
						const file = files[0];
						setIsLoading(true);
						const { url, key } = await makeContentUploadUrl.mutateAsync();
						await fetch(url, {
							method: 'PUT',
							body: file,
							headers: { 'Content-Type': file.type }
						});
						const { file: remoteFile } = await registerFile.mutateAsync({
							key,
							contentType: file.type,
							size: file.size
						});
						updateAttributes({ imageId: remoteFile.id });
						setIsLoading(false);
					});
				};

				const handleRemoveImage = async () => {
					setIsLoading(true);
					await deleteFile.mutateAsync({ fileId: imageId });
					setIsLoading(false);
					updateAttributes({ imageId: '', imageUrl: '' });
				};

				const textRef = useRef<HTMLDivElement>(null);
				useEffect(() => {
					if (textRef.current) {
						textRef.current.textContent = text;
					}
				}, []);

				const handleMoveUp = () => {
					if (isFirst) return;

					editor
						.chain()
						.focus()
						.insertContentAt(pos - 1, node)
						.run();
					deleteNode();
				};

				const handleMoveDown = () => {
					if (isLast) return;

					editor
						.chain()
						.focus()
						.insertContentAt(pos + 2, node)
						.run();
					deleteNode();
				};

				const handleSwitchSide = () => {
					updateAttributes({ align: align === 'left' ? 'right' : 'left' });
				};

				return (
					<NodeViewWrapper
						as="div"
						data-type={nodeName}
						className={cn(
							'mb-2',
							selected && 'bg-accent-weak border-accent-medium'
						)}>
						<div
							className={cn(
								'relative flex gap-4 w-full items-center',
								align === 'left' ? 'flex-row' : 'flex-row-reverse',
								'group',
								selected && 'border-accent-medium'
							)}>
							<div className="flex-1 shrink-0">
								<div className="aspect-square bg-neutral-weak rounded-xl relative overflow-hidden">
									{downloadUrl.data && (
										<img
											src={downloadUrl.data}
											alt={imageId}
											className="object-cover w-full h-full"
										/>
									)}

									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
										{hasFile && (
											<Button
												variant="solid-weak"
												size="sm"
												singleIcon="close"
												loading={isLoading}
												onClick={handleRemoveImage}
											/>
										)}

										{!hasFile && (
											<Button
												variant="solid-weak"
												size="sm"
												singleIcon="upload"
												loading={isLoading}
												onClick={handleUpload}
											/>
										)}
									</div>
								</div>
							</div>

							<div className="flex-1 shrink-0 self-stretch">
								<div
									contentEditable
									suppressContentEditableWarning
									onInput={(e) =>
										updateAttributes({ text: e.currentTarget.textContent })
									}
									ref={textRef}
									className="w-full min-h-full flex items-center justify-center text-center outline-none"
								/>
							</div>

							{/* Move Up */}
							<div className="absolute left-1/2 top-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-300 z-20">
								<Button
									variant="solid-weak"
									size="sm"
									singleIcon="chevron-up"
									onClick={handleMoveUp}
								/>
							</div>

							{/* Move Down */}
							<div className="absolute left-1/2 bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-300 z-20">
								<Button
									variant="solid-weak"
									size="sm"
									singleIcon="chevron-down"
									onClick={handleMoveDown}
								/>
							</div>

							{/* Switch side */}
							<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300 z-20">
								<Button
									variant="solid-weak"
									size="sm"
									singleIcon="arrow-horizontal"
									onClick={handleSwitchSide}
								/>
							</div>

							{/* Delete Node */}
							<div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300 z-20">
								<Button
									variant="solid-weak"
									size="sm"
									singleIcon="delete-circle"
									onClick={deleteNode}
								/>
							</div>
						</div>
					</NodeViewWrapper>
				);
			}
		);
	}
});

// ---

export default {
	name: nodeName,
	defaultAttributes: defaultAttributes,
	extension: extension
};
