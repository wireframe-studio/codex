'use client';

import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';
import { ImageTextEditNode } from './node-edit';
import { ImageTextView } from './node-view';

// --- Editable Extension Definitions ---

const ImageTextEditable = Node.create({
	name: 'imageText',
	group: 'block',
	content: '(paragraph | heading)*',
	atom: false,
	selectable: true,

	addAttributes() {
		return {
			fileId: { default: '' }
		};
	},
	parseHTML() {
		return [{ tag: 'div[data-type="imageText"]' }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'imageText' }),
			0
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(ImageTextEditNode);
	}
});

const ImageTextViewable = Node.create({
	name: 'imageText',
	group: 'block',
	content: 'paragraph+',
	atom: false,
	selectable: true,

	addAttributes() {
		return {
			fileId: { default: '' }
		};
	},
	parseHTML() {
		return [{ tag: 'div[data-type="imageText"]' }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'imageText' }),
			0
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(ImageTextView);
	}
});

// --- Export for Tiptap Extensions Array ---

export const imageTextExtensionsEditable = [ImageTextEditable];

export const imageTextExtensionsViewable = [ImageTextViewable];
