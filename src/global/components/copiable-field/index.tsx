'use client';

import { Button } from '@/deps/shadcn/ui/button';

import { FC, PropsWithChildren, useRef } from 'react';
import { toast } from 'sonner';

export const CopiableField: FC<{ value: string } & PropsWithChildren> = ({
	value,
	children
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const handleCopy = () => {
		if (ref.current) {
			navigator.clipboard.writeText(value);
			toast.success('Copied to clipboard');
		}
	};

	return (
		<>
			<div
				className="py-2 px-3 bg-neutral-weak rounded-xl body-3 text-neutral flex flex-row items-center gap-1"
				ref={ref}>
				<div className="flex-1">{children}</div>
				<Button
					size="xs"
					singleIcon="copy"
					onClick={handleCopy}
					variant="ghost-weak"
				/>
			</div>
		</>
	);
};
