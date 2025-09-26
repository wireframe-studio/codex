'use client';

import {
	mergeAttributes,
	Node,
	NodeViewContent,
	NodeViewWrapper,
	ReactNodeViewRenderer,
	type NodeViewProps
} from '@tiptap/react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { type IconName } from '@/global/components/icon';

import zigzagItem from './zigzag-item';

// ---

const nodeName = 'zigzagGroup';
const nodeIcon: IconName = 'layout-mosaic';

const defaultAttributes = {};

// ---

const extension = Node.create({
	name: nodeName,

	group: 'block',
	content: `${zigzagItem.name}+`,

	selectable: true,
	draggable: true,

	// HTML -> attrs
	parseHTML() {
		return [{ tag: `div[data-type="${nodeName}"]` }];
	},

	// attrs -> HTML
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': nodeName }),
			0
		];
	},

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
	icon: nodeIcon,
	defaultAttributes: defaultAttributes,
	extension: extension
};
