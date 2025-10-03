'use client';

import {
	Node,
	type NodeConfig,
	NodeViewWrapper,
	ReactNodeViewRenderer
} from '@tiptap/react';

import { Badge } from '@/deps/shadcn/ui/badge';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { typeToLabel } from '@/utils/type-to-label';
import { defaultSerialization } from '../../utils/default-serialization';

// ---

const nodeName = 'article-reference-block';

const defaultAttributes = {
	articleId: '',
	articleSlug: '',
	articleTitle: '',
	articleDescription: '',
	articleType: '',
	articleCoverUrl: ''
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
			const { articleId } = node.attrs as typeof defaultAttributes;

			const articleQuery = api.article.get.useQuery(
				{ articleId },
				{
					enabled: !!articleId
				}
			);

			return (
				<NodeViewWrapper
					as="div"
					data-type={nodeName}
					className={cn(
						'border rounded-lg border-neutral-medium flex flex-col items-center w-full overflow-hidden container-sm',
						selected && 'bg-accent-weak border-accent-medium'
					)}>
					<input
						type="text"
						placeholder="Article ID"
						value={articleId}
						onChange={(e) => updateAttributes({ articleId: e.target.value })}
						className="w-full p-4 caption text-center text-neutral-strong outline-none"
					/>

					{articleQuery.data && (
						<div className="w-full p-4 border-t border-t-neutral-medium flex flex-row gap-10 items-center">
							<div className="shrink-0 h-[180px] w-[120px] bg-neutral-weak rounded-lg overflow-hidden relative">
								{articleQuery.data.coverUrl && (
									<img
										src={articleQuery.data.coverUrl}
										alt={articleQuery.data.title}
										className="w-full h-full object-cover"
									/>
								)}
							</div>

							<div className="flex flex-col gap-2">
								{articleQuery.data.type && (
									<Badge variant="secondary" theme="info" className="w-fit">
										{typeToLabel(articleQuery.data.type)}
									</Badge>
								)}
								<p className="title-1 text-neutral">
									{articleQuery.data.title}
								</p>
								<p className="body-2 text-neutral-strong">
									{articleQuery.data.description}
								</p>
							</div>
						</div>
					)}
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
