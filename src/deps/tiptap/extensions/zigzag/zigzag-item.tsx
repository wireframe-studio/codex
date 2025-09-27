'use client';

import { Node, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { useEffect, useRef } from 'react';
import { useNodePosition } from '../../hooks/use-node-position';
import { useUploadFile } from '../../hooks/use-upload-file';
import { defaultSerialization } from '../../utils/default-serialization';

// ---

const nodeName = 'zigzagItem';

const defaultAttributes = {
	imageId: '',
	imageUrl: '',
	text: 'Hello',
	align: 'left' as 'left' | 'right'
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
				const { imageId, align, text } = node.attrs as typeof defaultAttributes;

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

				const textRef = useRef<HTMLDivElement>(null);
				useEffect(() => {
					if (textRef.current) {
						textRef.current.textContent = text;
					}
				}, []);

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
									{image.file.url && (
										<img
											src={image.file.url}
											alt={imageId}
											className="object-cover w-full h-full"
										/>
									)}

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
									onClick={moveUp}
								/>
							</div>

							{/* Move Down */}
							<div className="absolute left-1/2 bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-300 z-20">
								<Button
									variant="solid-weak"
									size="sm"
									singleIcon="chevron-down"
									onClick={moveDown}
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
	nodeOptions: nodeOptions,
	extension: extension
};
