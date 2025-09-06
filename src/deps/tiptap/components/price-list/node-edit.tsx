'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

// --- Editable NodeView for PriceList ---

export const PriceListNodeEdit = ({
	editor,
	node,
	getPos,
	updateAttributes,
	selected
}: any) => {
	const addItem = () => {
		const pos = getPos() + node.nodeSize - 1;
		editor
			.chain()
			.insertContentAt(pos, {
				type: 'priceListItem',
				attrs: { name: '', description: '', price: '' }
			})
			.focus(pos)
			.run();
	};

	return (
		<NodeViewWrapper
			as="div"
			data-type="priceList"
			className={cn(
				'border p-4 rounded-lg border-neutral-medium flex flex-col gap-4 items-center w-full',
				selected && 'bg-accent-weak border-accent-medium'
			)}>
			<div className="w-full">
				<NodeViewContent as="div" />
			</div>
			<Button
				variant="solid-weak"
				size="sm"
				onClick={addItem}
				rightIcon="add-circle">
				Add Item
			</Button>
		</NodeViewWrapper>
	);
};

// --- Editable NodeView for PriceListItem ---

export const PriceListItemNodeEdit = ({
	node,
	updateAttributes,
	deleteNode,
	selected
}: any) => {
	const { name, description, price } = node.attrs;

	return (
		<NodeViewWrapper
			as="div"
			data-type="priceListItem"
			className={cn(
				'priceListItemEditable mb-2'
				// selected && 'bg-accent-weak border-accent-medium'
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
							placeholder="Name"
							className="title-3 w-full flex-1 outline-none"
							value={name}
							onChange={(e) => updateAttributes({ name: e.target.value })}
						/>
						<input
							type="text"
							placeholder="Price"
							className="body-2 text-right grow-0 shrink-0 w-fit outline-none"
							value={price}
							onChange={(e) => updateAttributes({ price: e.target.value })}
						/>
					</div>
					<input
						type="text"
						placeholder="Description"
						className="body-2 outline-none"
						value={description}
						onChange={(e) => updateAttributes({ description: e.target.value })}
					/>
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
};
