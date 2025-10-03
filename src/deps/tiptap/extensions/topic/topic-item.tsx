'use client';

import { Node, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { useNodePosition } from '../../hooks/use-node-position';
import { useUploadFile } from '../../hooks/use-upload-file';
import { defaultSerialization } from '../../utils/default-serialization';

// ---

const nodeName = 'topicItem';

const defaultAttributes = {
	imageId: '',
	imageUrl: '',
	title: '',
	text: '',
	caption: ''
};

const nodeOptions = {
	name: nodeName,

	group: 'block',
	content: '',
	atom: true,

	selectable: true,
	draggable: true
};

// ---

const extension = Node.create({
	...nodeOptions,
	...defaultSerialization(nodeName, defaultAttributes),

	// react view // attrs -> React
	addNodeView() {
		return ReactNodeViewRenderer(
			({ editor, node, updateAttributes, deleteNode, selected, getPos }) => {
				const { imageId, text, title, caption } =
					node.attrs as typeof defaultAttributes;

				const { moveUp, moveDown } = useNodePosition({
					getPos,
					editor,
					deleteNode,
					node
				});

				const image = useUploadFile(imageId);

				const handleUpload = () => {
					image.upload((fileId, fileKey, fileUrl) => {
						updateAttributes({ imageId: fileId });
					});
				};

				const handleRemoveImage = () => {
					image.remove(() => {
						updateAttributes({ imageId: '', imageUrl: '' });
					});
				};

				return (
					<NodeViewWrapper
						as="div"
						data-type={nodeName}
						className={cn(
							'w-full',
							'flex flex-col gap-4',
							'p-4 bg-section relative',
							'rounded-lg',
							selected && 'bg-accent-weak border-accent-medium'
						)}>
						<div className="flex-1 shrink-0">
							<div className="min-h-[120px] bg-neutral-weak rounded-xl relative overflow-hidden">
								{image.file.url && (
									<img
										src={image.file.url}
										alt={imageId}
										className="object-cover w-full h-full"
									/>
								)}

								{/* Caption */}
								<div className="absolute bottom-2 left-2 right-0">
									<input
										type="text"
										placeholder="Caption"
										value={caption}
										onChange={(e) =>
											updateAttributes({ caption: e.target.value })
										}
										className="w-full caption text-left text-neutral-strong outline-none"
									/>
								</div>

								<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
									{image.file.id && (
										<Button
											variant="solid-weak"
											size="sm"
											singleIcon="close"
											loading={image.isLoading}
											onClick={handleRemoveImage}
										/>
									)}

									{!image.file.id && (
										<Button
											variant="solid-weak"
											size="sm"
											singleIcon="upload"
											loading={image.isLoading}
											onClick={handleUpload}
										/>
									)}
								</div>
							</div>

							<input
								type="text"
								placeholder="Title"
								value={title}
								onChange={(e) => updateAttributes({ title: e.target.value })}
								className="w-full p-4 caption text-center text-neutral outline-none"
							/>
							<input
								type="text"
								placeholder="Text"
								value={text}
								onChange={(e) => updateAttributes({ text: e.target.value })}
								className="w-full p-4 caption text-center text-neutral-strong outline-none"
							/>
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
	nodeOptions: nodeOptions,
	extension: extension
};
