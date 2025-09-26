'use client';

import {
	type Attribute,
	mergeAttributes,
	Node,
	NodeViewWrapper,
	ReactNodeViewRenderer
} from '@tiptap/react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';

// ---

const nodeName = 'testNodeItem';

const defaultAttributes = {
	src: 'hello',
	description: '' as string,
	price: ''
};

// ---

const extension = Node.create({
	name: nodeName,

	group: 'block',
	// content: '',
	atom: true,

	selectable: true,
	draggable: true,

	// default attrs
	addAttributes() {
		const keys = Object.keys(
			defaultAttributes
		) as (keyof typeof defaultAttributes)[];

		return keys.reduce((acc, key) => {
			acc[key] = { default: defaultAttributes[key] };
			return acc;
		}, {} as Record<keyof typeof defaultAttributes, Attribute>);
	},

	// parse // input HTML -> attrs
	parseHTML() {
		return [
			{
				tag: `div[data-type="${nodeName}"]`,
				getAttrs: (dom) => {
					const keys = Object.keys(
						defaultAttributes
					) as (keyof typeof defaultAttributes)[];

					return keys.reduce((acc, key) => {
						const value = dom.getAttribute(`data-${key}`);
						acc[key] = value ?? defaultAttributes[key];
						return acc;
					}, defaultAttributes);
				}
			}
		];
	},

	// serilize // attrs -> output HTML
	renderHTML({ node, HTMLAttributes }) {
		const attrs = node.attrs as typeof defaultAttributes;

		const keys = Object.keys(attrs) as (keyof typeof defaultAttributes)[];

		const dataAttributes = keys.reduce((acc, key) => {
			acc[`data-${key}`] = attrs[key] ?? defaultAttributes[key];
			return acc;
		}, {} as Record<string, string>);

		return [
			'div',
			mergeAttributes(HTMLAttributes, {
				'data-type': nodeName,
				...dataAttributes
			})
		];
	},

	// react view // attrs -> React
	addNodeView() {
		return ReactNodeViewRenderer(
			({ node, updateAttributes, deleteNode, selected }) => {
				const { src } = node.attrs as typeof defaultAttributes;

				return (
					<NodeViewWrapper
						as="div"
						data-type={nodeName}
						className={cn(
							'mb-2',
							selected && 'bg-accent-weak border-accent-medium'
						)}>
						<div
							className={cn(
								'flex flex-row gap-4 w-full items-center p-3 rounded-xl bg-neutral-weak',
								selected && 'border-accent-medium'
							)}>
							<div className="flex flex-col gap-2 w-full">
								<div className="flex flex-row gap-2">
									<input
										type="text"
										placeholder="Src"
										className="title-3 w-full flex-1 outline-none"
										value={src}
										onChange={(e) => updateAttributes({ src: e.target.value })}
									/>
								</div>
							</div>
							<Button
								variant="solid-weak"
								size="sm"
								singleIcon="delete-circle"
								onClick={deleteNode}
							/>
						</div>
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
	extension: extension
};
