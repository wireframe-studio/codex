'use client';

import { Bold } from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Document } from '@tiptap/extension-document';
import { Heading } from '@tiptap/extension-heading';
import { History } from '@tiptap/extension-history';
import { Italic } from '@tiptap/extension-italic';
import { Link } from '@tiptap/extension-link';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Strike } from '@tiptap/extension-strike';
import { Text } from '@tiptap/extension-text';

import { type Extensions } from '@tiptap/react';
import {
	doctorListExtensionsEditable,
	doctorListExtensionsViewable
} from './components/doctor-list/extension';
import {
	galleryExtensionsEditable,
	galleryExtensionsViewable
} from './components/gallery/extension';
import {
	imageTextExtensionsEditable,
	imageTextExtensionsViewable
} from './components/image-text/extension';
import {
	priceListExtensionsEditable,
	priceListExtensionsViewable
} from './components/price-list/extension';

const baseExtensions: Extensions = [
	Document,
	Placeholder.configure({
		placeholder: 'Napiši nešto...'
	}),
	Paragraph.configure({
		HTMLAttributes: {
			class: 'element-paragraph'
		}
	}),
	Heading.configure({
		levels: [1, 2, 3],
		HTMLAttributes: {
			class: 'element-heading'
		}
	}),
	Text,
	Bold,
	Italic,
	Strike,
	Link.configure({
		openOnClick: false,
		autolink: true,
		defaultProtocol: 'https',
		protocols: ['http', 'https'],
		HTMLAttributes: {
			class: 'element-link'
		}
	}),
	BulletList.configure({
		HTMLAttributes: {
			class: 'element-bullet-list'
		}
	}),
	ListItem.configure({
		HTMLAttributes: {
			class: 'element-list-item'
		}
	}),
	OrderedList.configure({
		HTMLAttributes: {
			class: 'element-ordered-list'
		}
	})
];

export const tiptapExtensionsEditable: Extensions = [
	...baseExtensions,
	...priceListExtensionsEditable,
	...galleryExtensionsEditable,
	...imageTextExtensionsEditable,
	...doctorListExtensionsEditable,
	History
];

export const tiptapExtensionsViewable: Extensions = [
	...baseExtensions,
	...priceListExtensionsViewable,
	...galleryExtensionsViewable,
	...imageTextExtensionsViewable,
	...doctorListExtensionsViewable
];
