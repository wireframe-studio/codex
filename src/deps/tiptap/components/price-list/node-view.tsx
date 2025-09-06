'use client';

import { cn } from '@/deps/shadcn/utils';
import { Icon } from '@/global/components/icon';
import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';

// --- View-Only View for PriceList ---

export const PriceListNodeView = ({ node }: { node: any }) => {
	// node is a priceList node
	const items = node.content?.content || [];
	return (
		<NodeViewWrapper
			as="div"
			data-type="priceList"
			className="px-1 w-full container-md">
			<div className="rounded-[16px] flex flex-col py-1 bg-section overflow-hidden group/list">
				{items.map((itemNode: any, idx: number) => (
					<PriceListItemNodeView key={idx} node={itemNode} />
				))}
			</div>
		</NodeViewWrapper>
	);
};

// --- View-Only View for PriceListItem ---

export const PriceListItemNodeView = ({ node }: { node: any }) => {
	const { name, description, price } = node.attrs;
	const [open, setOpen] = useState(false);
	return (
		<NodeViewWrapper
			as="div"
			data-type="priceListItem"
			className={cn(
				'px-1 w-full',
				'[&:not(:last-child)]:border-b',
				'duration-300',
				'border-b-background group-hover/list:border-b-transparent'
			)}
			onClick={() => setOpen((o) => !o)}>
			<div
				className={cn(
					'rounded-[12px] flex flex-row gap-4 items-center px-4 py-4 w-full',
					'bg-none hover:bg-neutral-weak duration-300 active:duration-100',
					'group/node cursor-pointer'
				)}>
				<Icon
					icon={open ? 'chevron-up' : 'chevron-down'}
					className={cn(
						'size-5',
						'duration-300',
						!open && 'bg-neutral-medium group-hover/node:bg-neutral',
						open && 'bg-neutral'
					)}
				/>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-between items-center gap-2">
						<div className="title-3 flex-1">{name}</div>
						<div className="body-2 shrink-0">{price}</div>
					</div>
					{open && <div className="body-2">{description}</div>}
				</div>
			</div>
		</NodeViewWrapper>
	);
};
