'use client';

import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';
import { GalleryGridEditNode, GalleryItemEditNode } from './node-edit';
import { GalleryGridView, GalleryItemView } from './node-view';
// import { fileIdListItemView, fileIdListView } from './node-view';

// --- Editable Extension Definitions ---

const GalleryGridEditable = Node.create({
	name: 'galleryGrid',
	group: 'block',
	content: 'galleryItem*',
	atom: false,
	selectable: true,
	parseHTML() {
		return [{ tag: 'div[data-type="galleryGrid"]' }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'galleryGrid' }),
			0
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(GalleryGridEditNode);
	}
});

const GalleryItemEditable = Node.create({
	name: 'galleryItem',
	group: 'block',
	content: '',
	atom: true,
	selectable: true,
	draggable: true,
	addAttributes() {
		return {
			fileId: { default: '' }
		};
	},
	parseHTML() {
		return [{ tag: 'div[data-type="galleryItem"]' }];
	},
	renderHTML({ node, HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'galleryItem' }),
			['span', { 'data-field': 'fileId' }, node.attrs.fileId ?? '']
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(GalleryItemEditNode);
	}
});

// // --- Viewable Extension Definitions ---

const GalleryGridViewable = Node.create({
	name: 'galleryGrid',
	group: 'block',
	content: 'galleryItem+',
	atom: false,
	selectable: true,
	parseHTML() {
		return [{ tag: 'div[data-type="galleryGrid"]' }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'galleryGrid' }),
			0
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(GalleryGridView);
	}
});

const GalleryItemViewable = Node.create({
	name: 'galleryItem',
	group: 'block',
	content: '',
	atom: true,
	selectable: true,
	addAttributes() {
		return {
			fileId: { default: '' }
		};
	},
	parseHTML() {
		return [{ tag: 'div[data-type="galleryItem"]' }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'galleryItem' }),
			0
		];
	},
	addNodeView() {
		return ReactNodeViewRenderer(GalleryItemView);
	}
});

// --- Export for Tiptap Extensions Array ---

export const galleryExtensionsEditable = [
	GalleryGridEditable,
	GalleryItemEditable
];

export const galleryExtensionsViewable = [
	GalleryGridViewable,
	GalleryItemViewable
];
