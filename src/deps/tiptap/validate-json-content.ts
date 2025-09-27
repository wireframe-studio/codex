import { getSchema, type JSONContent } from '@tiptap/core';
import { Node } from 'prosemirror-model';
import { extensions } from './extensions';

export const validateJSONContent = (doc: unknown) => {
	try {
		const schema = getSchema(extensions);
		const contentNode = Node.fromJSON(schema, doc);
		contentNode.check();
		return doc as JSONContent;
	} catch (e) {
		throw new Error('Invalid JSON content', { cause: e });
	}
};
