'use client';

import {
	Node,
	type NodeConfig,
	NodeViewWrapper,
	ReactNodeViewRenderer
} from '@tiptap/react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { useUploadFile } from '../../hooks/use-upload-file';
import { defaultSerialization } from '../../utils/default-serialization';

// ---

const nodeName = 'image-block';

const defaultAttributes = {
	imageId: '',
	imageUrl: '',
	caption: 'Hello'
};

const nodeOptions: Partial<NodeConfig> = {
	name: nodeName,

	group: 'block',
	content: 'block?',

	selectable: true,
	draggable: true
};

// ---

const extension = Node.create({
	...nodeOptions,
	...defaultSerialization(nodeName, defaultAttributes),

	// react view // attrs -> React
	addNodeView() {
		return ReactNodeViewRenderer(({ node, updateAttributes, selected }) => {
			const { imageId, caption } = node.attrs as typeof defaultAttributes;

			const image = useUploadFile(imageId);

			const handleImageUpload = () => {
				image.upload((fileId, fileKey, fileUrl) => {
					updateAttributes({ imageId: fileId });
				});
			};

			const handleImageRemove = () => {
				image.remove(() => {
					updateAttributes({ imageId: '', imageUrl: '' });
				});
			};

			return (
				<NodeViewWrapper
					as="div"
					data-type={nodeName}
					className={cn(
						'border rounded-lg border-neutral-medium flex flex-col items-center w-full overflow-hidden container-md',
						selected && 'bg-accent-weak border-accent-medium'
					)}>
					<div className="min-h-[200px] w-full bg-neutral-weak relative overflow-hidden border-b border-b-neutral-medium">
						{image.file.url && (
							<img
								src={image.file.url}
								alt="Image"
								className="w-full h-full object-cover"
							/>
						)}

						{image.file.id && (
							<div className="absolute top-2 right-2">
								<Button
									variant="solid-weak"
									size="sm"
									singleIcon="close"
									loading={image.isLoading}
									onClick={handleImageRemove}
								/>
							</div>
						)}

						{/* No video actions */}
						{!image.file.url && (
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
								<Button
									variant="solid-weak"
									size="sm"
									singleIcon="upload"
									onClick={handleImageUpload}
									loading={image.isLoading}
								/>
							</div>
						)}
					</div>

					<input
						type="text"
						placeholder="Caption"
						value={caption}
						onChange={(e) => updateAttributes({ caption: e.target.value })}
						className="w-full p-4 caption text-center text-neutral-strong outline-none"
					/>
				</NodeViewWrapper>
			);
		});
	}
});

// ---

export default {
	name: nodeName,
	defaultAttributes: defaultAttributes,
	nodeOptions: nodeOptions,
	extension: extension
};
