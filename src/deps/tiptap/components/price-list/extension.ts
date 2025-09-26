'use client';

import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';
import { PriceListItemNodeEdit, PriceListNodeEdit } from './node-edit';
import { PriceListItemNodeView, PriceListNodeView } from './node-view';

// --- Editable Extension Definitions ---

const PriceListEditable = Node.create({
	name: 'priceList',
	group: 'block',
	content: 'priceListItem+',
	atom: false,
	selectable: true,
	parseHTML() {
		return [{ tag: 'div[data-type="priceList"]' }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'priceList' }),
			0
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(PriceListNodeEdit);
	}
});

const PriceListItemEditable = Node.create({
	name: 'priceListItem',
	group: 'block',
	content: '',
	atom: true,
	selectable: true,
	draggable: true,
	addAttributes() {
		return {
			name: { default: '' },
			description: { default: '' },
			price: { default: '' }
		};
	},
	parseHTML() {
		return [{ tag: 'div[data-type="priceListItem"]' }];
	},
	renderHTML({ node, HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'priceListItem' }),
			['span', { 'data-field': 'name' }, node.attrs.name ?? ''],
			['span', { 'data-field': 'description' }, node.attrs.description ?? ''],
			['span', { 'data-field': 'price' }, node.attrs.price ?? '']
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(PriceListItemNodeEdit);
	}
});

// --- Viewable Extension Definitions ---

const PriceListViewable = Node.create({
	name: 'priceList',
	group: 'block',
	content: 'priceListItem+',
	atom: false,
	selectable: true,
	parseHTML() {
		return [{ tag: 'div[data-type="priceList"]' }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'priceList' }),
			0
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(PriceListNodeView);
	}
});

const PriceListItemViewable = Node.create({
	name: 'priceListItem',
	group: 'block',
	content: '',
	atom: true,
	selectable: true,
	addAttributes() {
		return {
			name: { default: '' },
			description: { default: '' },
			price: { default: '' }
		};
	},
	parseHTML() {
		return [{ tag: 'div[data-type="priceListItem"]' }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'priceListItem' }),
			0
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(PriceListItemNodeView);
	}
});

// --- Export for Tiptap Extensions Array ---

export const priceListExtensionsEditable = [
	PriceListEditable,
	PriceListItemEditable
];

export const priceListExtensionsViewable = [
	PriceListViewable,
	PriceListItemViewable
];
