'use client';

import {
	Node,
	type NodeConfig,
	NodeViewWrapper,
	ReactNodeViewRenderer
} from '@tiptap/react';

import { cn } from '@/deps/shadcn/utils';
import { defaultSerialization } from '../../utils/default-serialization';

// ---

const nodeName = 'youtube-embed-block';

const defaultAttributes = {
	embedUrl: '',
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
			const { embedUrl, caption } = node.attrs as typeof defaultAttributes;

			const youtube_parser = (url: string) => {
				const regExp =
					/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
				const match = regExp.exec(url);
				return match && match[7].length == 11 ? match[7] : false;
			};

			return (
				<NodeViewWrapper
					as="div"
					data-type={nodeName}
					className={cn(
						'border rounded-lg border-neutral-medium flex flex-col items-center w-full overflow-hidden container-md',
						selected && 'bg-accent-weak border-accent-medium'
					)}>
					<input
						type="text"
						placeholder="Embed URL"
						value={embedUrl}
						onChange={(e) => updateAttributes({ embedUrl: e.target.value })}
						className="w-full p-4 caption text-center text-neutral outline-none border-b border-b-neutral-medium"
					/>

					<div className="aspect-video w-full bg-neutral-weak relative overflow-hidden border-b border-b-neutral-medium">
						{embedUrl && (
							<>
								<iframe
									src={
										'https://www.youtube.com/embed/' +
										youtube_parser(embedUrl) +
										'?rel=0&amp;modestbranding=1'
									}
									className="w-full h-full"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
									title="YouTube video player"
									allowFullScreen
								/>
							</>
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
