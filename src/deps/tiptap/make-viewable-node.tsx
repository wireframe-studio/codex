import {
	type Attribute,
	type NodeConfig,
	type NodeViewProps,
	mergeAttributes,
	Node,
	ReactNodeViewRenderer
} from '@tiptap/react';
import { type ComponentType } from 'react';

import zigzagItem from './extensions/zigzag/zigzag-item';

export const makeViewableNode = <T extends Record<string, any>>({
	nodeName,
	defaultAttributes,
	reactNode,
	nodeOptions
}: {
	nodeName: string;
	defaultAttributes: T;
	reactNode: ComponentType<NodeViewProps>;
	nodeOptions: Partial<NodeConfig>;
}) => {
	return Node.create({
		name: nodeName,

		...nodeOptions,

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
							const value = dom.getAttribute(`data-${String(key)}`) as any;
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
				acc[`data-${String(key)}`] = attrs[key] ?? defaultAttributes[key];
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

		addNodeView() {
			return ReactNodeViewRenderer(reactNode);
		}
	});
};

// ---

makeViewableNode({
	nodeName: zigzagItem.name,
	defaultAttributes: zigzagItem.defaultAttributes,
	nodeOptions: zigzagItem.nodeOptions,
	reactNode: ({ editor, node, getPos, selected }) => {
		return <div>Hello</div>;
	}
});
