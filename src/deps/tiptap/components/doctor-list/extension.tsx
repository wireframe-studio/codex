'use client';

import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { DoctorListNodeEdit } from './node-edit';
import { DoctorListNodeView } from './node-view';

// --- Node Extension ---
const DoctorListEditable = Node.create({
	name: 'doctorList',
	group: 'block',
	content: 'inline*',
	atom: true,
	draggable: true,

	addAttributes() {
		return { ids: { default: '' } };
	},

	parseHTML() {
		return [{ tag: 'div[data-type="doctorList"]' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['div', { ...HTMLAttributes, 'data-type': 'doctorList' }, 0];
	},

	addNodeView() {
		return ReactNodeViewRenderer(DoctorListNodeEdit);
	}
});

// --- Viewable Node Extension ---
const DoctorListViewable = Node.create({
	name: 'doctorList',
	group: 'block',
	content: 'inline*',
	atom: true,
	selectable: false,

	addAttributes() {
		return {
			ids: {
				default: ''
			}
		};
	},

	parseHTML() {
		return [
			{
				tag: 'div[data-type="doctorList"]'
			}
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['div', { ...HTMLAttributes, 'data-type': 'doctorList' }, 0];
	},

	addNodeView() {
		return ReactNodeViewRenderer(DoctorListNodeView);
	}
});

export const doctorListExtensionsEditable = [DoctorListEditable];
export const doctorListExtensionsViewable = [DoctorListViewable];
