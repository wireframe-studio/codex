'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { useImageTextNodeEdit } from './use-image-text-node-edit';

// --- Editable NodeView for PriceList ---

export const ImageTextEditNode = ({
	editor,
	node,
	getPos,
	updateAttributes,
	selected
}: any) => {
	const setFileId = (fileId: string) => {
		console.log('setFileId', fileId);
		updateAttributes({ fileId });
	};

	const { upload } = useImageTextNodeEdit();

	const { fileId } = node.attrs;
	const fileUrl = api.file.getFileDownloadUrl.useQuery(
		{ fileId },
		{ enabled: !!fileId }
	);

	const handleUpload = () => {
		upload(setFileId);
	};

	return (
		<NodeViewWrapper
			as="div"
			data-type="imageText"
			className={cn(
				'image-text-editable',
				'rounded-lg flex flex-row items-center w-full gap-4',
				selected && 'bg-accent-weak'
			)}>
			<div className="flex flex-col gap-2 w-full aspect-video bg-neutral-weak rounded-md overflow-hidden relative">
				{fileUrl.data && (
					<img
						src={fileUrl.data}
						alt={node.attrs.name}
						className="w-full h-full object-cover"
					/>
				)}
				{!fileId && (
					<Button
						variant="ghost"
						size="lg"
						singleIcon="upload"
						className="absolute top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2"
						onClick={handleUpload}
					/>
				)}
				{fileId && (
					<Button
						variant="solid"
						size="lg"
						singleIcon="trash"
						className="absolute top-4 right-4"
					/>
				)}
			</div>

			<NodeViewContent
				as="div"
				className="w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-2 mb-2"
			/>
		</NodeViewWrapper>
	);
};
