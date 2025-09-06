import { cn } from '@/deps/shadcn/utils';
import React from 'react';
import { icons } from './icons';

export type IconName = keyof typeof icons;

export const Icon: React.FC<{
	icon: IconName;
	className?: string;
}> = ({ icon, className }) => {
	return (
		<div
			className={cn(
				'transition-all ease-in duration-200 shrink-0',
				'size-6 bg-neutral',
				className
			)}
			style={{
				WebkitMaskImage: `url('${icons[icon]}')`,
				maskImage: `url('${icons[icon]}')`,
				WebkitMaskRepeat: 'no-repeat',
				WebkitMaskSize: 'contain',
				WebkitMaskPosition: 'center center',
				maskRepeat: 'no-repeat'
			}}
		/>
	);
};
