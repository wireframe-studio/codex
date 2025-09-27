import { Attribute, mergeAttributes, type NodeConfig } from '@tiptap/react';

export const defaultSerialization = (
	nodeName: string,
	defaultAttributes: { [key: string]: any }
): Partial<NodeConfig> => ({
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
						const value = dom.getAttribute(`data-${key}`) as any;
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
	}
});
