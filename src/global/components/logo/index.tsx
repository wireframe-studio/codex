'use client';
import { cn } from '@/deps/shadcn/utils';
import React from 'react';

export const Logo: React.FC<{
	className?: string;
}> = ({ className }) => {
	const url = '/assets/illustrations/logo-monotone.svg';
	return (
		<div
			className={cn(
				'transition-all ease-in shrink-0',
				'size-6 bg-neutral',
				className
			)}
			style={{
				WebkitMaskImage: `url('${url}')`,
				maskImage: `url('${url}')`,
				WebkitMaskRepeat: 'no-repeat',
				WebkitMaskSize: 'contain',
				WebkitMaskPosition: 'center center',
				maskRepeat: 'no-repeat'
			}}
		/>
	);
};

export const LogoDuotone: React.FC<{
	className?: string;
	accentClassName?: string;
}> = ({ className, accentClassName }) => {
	const url = '/assets/illustrations/logo-monotone.svg';
	const urlAccent = '/assets/illustrations/logo-accent.svg';

	return (
		<div className="relative w-full">
			<div
				className={cn(
					'transition-all ease-in shrink-0',
					'bg-neutral',
					className
				)}
				style={{
					WebkitMaskImage: `url('${url}')`,
					maskImage: `url('${url}')`,
					WebkitMaskRepeat: 'no-repeat',
					WebkitMaskSize: 'contain',
					WebkitMaskPosition: 'center center',
					maskRepeat: 'no-repeat'
				}}
			/>
			<div
				className={cn(
					'transition-all ease-in shrink-0 absolute top-0 left-0',
					'bg-neutral',
					className,
					accentClassName
				)}
				style={{
					WebkitMaskImage: `url('${urlAccent}')`,
					maskImage: `url('${urlAccent}')`,
					WebkitMaskRepeat: 'no-repeat',
					WebkitMaskSize: 'contain',
					WebkitMaskPosition: 'center center',
					maskRepeat: 'no-repeat'
				}}
			/>
		</div>
	);
};
