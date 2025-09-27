import { type Node } from '@tiptap/pm/model';
import { type Editor } from '@tiptap/react';

export const useNodePosition = ({
	getPos,
	editor,
	deleteNode,
	node
}: {
	getPos: () => number;
	editor: Editor;
	deleteNode: () => void;
	node: Node;
}) => {
	const pos = getPos();
	const resolvedPos = editor.state.doc.resolve(pos);
	const currentIndex = resolvedPos.index();
	const parent = resolvedPos.parent;
	const isFirst = currentIndex === 0;
	const isLast = currentIndex === parent.childCount - 1;

	const moveUp = () => {
		if (isFirst) return;

		editor
			.chain()
			.focus()
			.insertContentAt(pos - 1, node)
			.run();
		deleteNode();
	};

	const moveDown = () => {
		if (isLast) return;

		editor
			.chain()
			.focus()
			.insertContentAt(pos + 2, node)
			.run();
		deleteNode();
	};

	return { pos, isFirst, isLast, moveUp, moveDown };
};
