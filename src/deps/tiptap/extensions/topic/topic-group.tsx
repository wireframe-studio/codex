'use client';

import {
	Node,
	NodeViewContent,
	NodeViewWrapper,
	ReactNodeViewRenderer,
	type NodeViewProps
} from '@tiptap/react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';

import { defaultSerialization } from '../../utils/default-serialization';
import topicItem from './topic-item';

// ---

const nodeName = 'topicGroup';

const defaultAttributes = {};

const nodeOptions = {
	name: nodeName,

	group: 'block',
	content: `${topicItem.name}+`,

	selectable: true,
	draggable: true
};

// ---

const extension = Node.create({
	...nodeOptions,
	...defaultSerialization(nodeName, defaultAttributes),

	// react view
	addNodeView() {
		return ReactNodeViewRenderer(
			({ editor, node, getPos, selected }: NodeViewProps) => {
				const numberOfChildren = node.childCount;

				const handleAddItem = () => {
					const pos = getPos() + node.nodeSize - 1;
					editor
						.chain()
						.insertContentAt(pos, {
							type: topicItem.name,
							attrs: {
								...topicItem.defaultAttributes
							} satisfies typeof topicItem.defaultAttributes
						})
						.focus(pos)
						.run();
				};

				return (
					<NodeViewWrapper
						as="div"
						data-type={nodeName}
						className={cn(
							'border p-4 rounded-lg border-neutral-medium flex flex-col gap-4 items-center w-full container-md topic-grid',
							selected && 'bg-accent-weak border-accent-medium'
						)}>
						<div
							className={cn(
								'w-full topic-grid',
								numberOfChildren === 2 && 'topic-grid-two-override'
							)}>
							<NodeViewContent as="div" />
						</div>

						<Button
							variant="solid-weak"
							size="sm"
							onClick={handleAddItem}
							rightIcon="add-circle">
							Add Item
						</Button>
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
