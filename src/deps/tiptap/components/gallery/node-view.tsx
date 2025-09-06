'use client';

import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { Reveal, RevealArea } from '@/global/components/reveal';
import { NodeViewWrapper } from '@tiptap/react';

// --- View-Only View for PriceList ---

export const GalleryGridView = ({ node }: { node: any }) => {
	// node is a galleryGrid node
	const items = node.content?.content || [];
	return (
		<NodeViewWrapper
			as="div"
			data-type="galleryGrid"
			className={
				'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-1 gap-1 w-full container-xl'
			}>
			{items.map((itemNode: any, idx: number) => (
				<GalleryItemView key={idx} node={itemNode} />
			))}
		</NodeViewWrapper>
	);
};

// --- View-Only View for PriceListItem ---

export const GalleryItemView = ({ node }: { node: any }) => {
	const { fileId } = node.attrs;

	const fileDownloadUrl = api.file.getFileDownloadUrl.useQuery(
		{ fileId },
		{ enabled: !!fileId }
	);

	return (
		<NodeViewWrapper
			as="div"
			data-type="galleryItem"
			className={'flex flex-col items-center w-full'}>
			<RevealArea
				as="div"
				className={cn(
					'relative border border-transparent flex flex-row gap-4 w-full items-center'
				)}>
				<Reveal className="duration-700 flex flex-col gap-2 w-full aspect-video bg-neutral-weak rounded-lg overflow-hidden">
					{fileDownloadUrl.data && (
						<img
							src={fileDownloadUrl.data}
							alt={fileId}
							className="w-full h-full object-cover"
						/>
					)}
				</Reveal>
			</RevealArea>
		</NodeViewWrapper>
	);
};
