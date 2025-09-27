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
import zigzagItem from './zigzag-item';

// ---

const nodeName = 'zigzagGroup';

const defaultAttributes = {};

const nodeOptions = {
	name: nodeName,

	group: 'block',
	content: `${zigzagItem.name}+`,

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
							type: zigzagItem.name,
							attrs: {
								...zigzagItem.defaultAttributes,
								align: numberOfChildren % 2 === 0 ? 'left' : 'right'
							} satisfies typeof zigzagItem.defaultAttributes
						})
						.focus(pos)
						.run();
				};

				return (
					<NodeViewWrapper
						as="div"
						data-type={nodeName}
						className={cn(
							'border p-4 rounded-lg border-neutral-medium flex flex-col gap-4 items-center w-full',
							selected && 'bg-accent-weak border-accent-medium'
						)}>
						<div className="w-full">
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
