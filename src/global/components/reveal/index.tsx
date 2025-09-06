'use client';

import { cn } from '@/deps/shadcn/utils';
import { useIntersectionObserver } from '@/global/hooks/use-intersection-observer';
import { FC, HTMLAttributes } from 'react';

import { createContext, useContext } from 'react';

interface RevealContextType {
	isInView: boolean;
}

const RevealContext = createContext<RevealContextType | undefined>(undefined);

export const useReveal = () => {
	const context = useContext(RevealContext);
	if (!context) {
		throw new Error('useReveal must be used within a RevealArea');
	}
	return context;
};

export const RevealArea: FC<
	HTMLAttributes<HTMLDivElement> & { as?: string }
> = ({ className, ...props }) => {
	const { elementRef, isInView } = useIntersectionObserver();

	const Component = (props.as || 'div') as 'div';

	return (
		<RevealContext.Provider value={{ isInView }}>
			<Component ref={elementRef} className={cn(className)} {...props} />
		</RevealContext.Provider>
	);
};

export const Reveal: FC<
	HTMLAttributes<HTMLDivElement> & {
		from?: string;
		to?: string;
	}
> = ({ className, from = 'opacity-0', to = 'opacity-100', ...props }) => {
	const { isInView } = useReveal();

	return (
		<div
			className={cn('ease-in-out', className, isInView ? to : from)}
			{...props}
		/>
	);
};
