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

const nodeName = 'video-block';

const defaultAttributes = {
	videoId: '',
	videoUrl: '',
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
			const { imageId, videoId, caption } =
				node.attrs as typeof defaultAttributes;

			const thumbnail = useUploadFile(imageId);
			const video = useUploadFile(videoId);

			const handleVideoUpload = () => {
				video.upload((fileId, fileKey, fileUrl) => {
					updateAttributes({ videoId: fileId });
				});
			};

			const handleThumbnailUpload = () => {
				thumbnail.upload((fileId, fileKey, fileUrl) => {
					updateAttributes({ imageId: fileId });
				});
			};

			const handleVideoRemove = () => {
				video.remove(() => {
					updateAttributes({
						videoId: '',
						videoUrl: '',
						imageId: '',
						imageUrl: ''
					});
				});
			};

			const handleThumbnailRemove = () => {
				thumbnail.remove(() => {
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
					<div className="aspect-video w-full bg-neutral-weak relative overflow-hidden border-b border-b-neutral-medium">
						{video.file.url && (
							<>
								<video
									src={video.file.url}
									controls
									className="w-full h-full"
								/>

								<div className="absolute top-2 right-2 flex flex-row gap-2">
									<Button
										variant="solid-weak"
										size="sm"
										singleIcon="delete-circle"
										onClick={handleVideoRemove}
										loading={video.isLoading}
									/>
								</div>

								<div className="absolute top-2 left-2 flex flex-row gap-2">
									{!thumbnail.file.url && (
										<Button
											variant="solid-weak"
											size="sm"
											rightIcon="upload"
											onClick={handleThumbnailUpload}
											loading={thumbnail.isLoading}>
											Thumbnail
										</Button>
									)}

									{thumbnail.file.url && (
										<div className="h-[64px] aspect-video bg-neutral-weak rounded-md overflow-hidden relative">
											<img
												src={thumbnail.file.url}
												alt="Thumbnail"
												className="w-full h-full object-cover"
											/>

											<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
												<Button
													variant="solid-weak"
													size="sm"
													singleIcon="delete-circle"
													onClick={handleThumbnailRemove}
													loading={thumbnail.isLoading}></Button>
											</div>
										</div>
									)}
								</div>
							</>
						)}

						{/* No video actions */}
						{!video.file.url && (
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
								<Button
									variant="solid-weak"
									size="sm"
									singleIcon="upload"
									onClick={handleVideoUpload}
									loading={video.isLoading}
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
