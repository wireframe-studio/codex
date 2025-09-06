'use client';

import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { Reveal, RevealArea } from '@/global/components/reveal';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

export const ImageTextView = ({ node }: { node: any }) => {
	const { fileId } = node.attrs;

	const fileDownloadUrl = api.file.getFileDownloadUrl.useQuery(
		{ fileId },
		{ enabled: !!fileId }
	);

	return (
		<NodeViewWrapper
			as="div"
			data-type="imageText"
			className="w-full overflow-hidden flex flex-col items-center">
			<RevealArea
				as="div"
				className={cn(
					'image-text-view',
					'flex flex-col md:flex-row justify-end items-center gap-6 container-lg mx-auto w-full'
				)}>
				<Reveal
					from="opacity-0 -translate-x-4"
					to="opacity-100 translate-x-0"
					className="duration-700 w-full md:w-[60vw] shrink-0 aspect-video relative right-0 overflow-hidden px-1">
					{fileDownloadUrl.data && (
						<img
							src={fileDownloadUrl.data}
							alt={fileId}
							className="w-full h-full object-cover rounded-lg md:rounded-2xl bg-neutral-weak"
						/>
					)}
				</Reveal>

				<Reveal
					from="opacity-0 -translate-x-8"
					to="opacity-100 translate-x-0"
					className="duration-700 w-full md:w-1/2 shrink-0 flex flex-col gap-4">
					<NodeViewContent
						as="div"
						className="w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-2"
					/>
				</Reveal>
			</RevealArea>
		</NodeViewWrapper>
	);
};
