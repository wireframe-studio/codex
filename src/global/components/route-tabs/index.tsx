'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { IconName } from '../icon';

export const Tabs: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-row gap-2 w-full overflow-x-auto scrollbar-hidden">
			{children}
		</div>
	);
};

export const Tab: FC<
	PropsWithChildren & { route: string; leftIcon?: IconName }
> = ({ children, route, leftIcon }) => {
	const pathname = usePathname();
	const isActive = pathname.includes(route);

	return (
		<Link
			href={route}
			className={cn(
				'py-2 border-b border-b-transparent',
				isActive && 'border-b-neutral'
			)}>
			<Button
				size="xs"
				variant={isActive ? 'ghost' : 'ghost-weak'}
				leftIcon={leftIcon}>
				{children}
			</Button>
		</Link>
	);
};
