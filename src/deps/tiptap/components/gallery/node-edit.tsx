'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { useGalleryGridNodeEdit } from './use-gallery-grid-node-edit';

// --- Editable NodeView for PriceList ---

export const GalleryGridEditNode = ({
	editor,
	node,
	getPos,
	updateAttributes,
	selected
}: any) => {
	const { upload, isUploading } = useGalleryGridNodeEdit();

	const handleAddItem = () => {
		upload((fileId) => {
			const pos = getPos() + node.nodeSize - 1;
			editor
				.chain()
				.insertContentAt(pos, {
					type: 'galleryItem',
					attrs: { fileId: fileId }
				})
				.focus(pos)
				.run();
		});
	};

	return (
		<NodeViewWrapper
			as="div"
			data-type="gallery-grid"
			className={cn(
				'gallery-grid-editable',
				'rounded-lg flex flex-col gap-4 items-center w-full',
				'p-4 border border-neutral-medium rounded-xl',
				selected && 'bg-accent-weak'
			)}>
			<NodeViewContent
				as="div"
				className="w-full [&>div]:grid [&>div]:grid-cols-3 [&>div]:gap-2"
			/>
			<Button
				variant="solid-weak"
				size="sm"
				onClick={handleAddItem}
				rightIcon="upload"
				loading={isUploading}>
				Upload image
			</Button>
		</NodeViewWrapper>
	);
};

// --- Editable NodeView for PriceListItem ---

export const GalleryItemEditNode = ({
	node,
	updateAttributes,
	deleteNode,
	selected
}: any) => {
	const { fileId } = node.attrs;

	const fileDownloadUrl = api.file.getFileDownloadUrl.useQuery(
		{ fileId },
		{ enabled: !!fileId }
	);

	return (
		<NodeViewWrapper
			as="div"
			data-type="galleryItem"
			className={cn('gallery-item-editable')}>
			<div
				className={cn(
					'relative border border-transparent flex flex-row gap-4 w-full items-center rounded-md',
					selected && 'bg-accent-weak border border-accent-medium'
				)}>
				<div className="flex flex-col gap-2 w-full aspect-video bg-neutral-weak rounded-md overflow-hidden">
					<img
						src={fileDownloadUrl.data}
						alt={fileId}
						className="w-full h-full object-cover"
					/>
				</div>

				<Button
					variant="solid-weak"
					size="sm"
					singleIcon="delete-circle"
					className="absolute top-2 right-2"
					onClick={deleteNode}
				/>
			</div>

			<NodeViewContent />
		</NodeViewWrapper>
	);
};
