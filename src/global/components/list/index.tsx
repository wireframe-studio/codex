import { cn } from '@/deps/shadcn/utils';
import {
	CSSProperties,
	FC,
	HTMLAttributes,
	PropsWithChildren,
	useEffect,
	useRef
} from 'react';
import { ActionsSizeProvider, useActionsSizeContext } from './context';

export const List: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ActionsSizeProvider>
			<div className="flex flex-col gap-2 px-1">{children}</div>
		</ActionsSizeProvider>
	);
};

export const Annotation: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="px-3 md:px-4 mt-2 caption text-neutral-strong">
			{children}
		</div>
	);
};

export const Labels: FC<PropsWithChildren> = ({ children }) => {
	return <div className="flex flex-row gap-2 px-3 md:px-4">{children}</div>;
};

export const Label: FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...props
}) => {
	return (
		<div
			className={cn('caption text-neutral-strong w-full', className)}
			{...props}>
			{children}
		</div>
	);
};

export const ActionsLabel = () => {
	const { size } = useActionsSizeContext();
	return (
		<div
			className="caption text-neutral-strong text-right shrink-0"
			style={{
				width: size ? Math.max(size, 48) : 48,
				transitionDuration: '0.2s'
			}}>
			Radnje
		</div>
	);
};

export const Items: FC<{ showSkeleton?: boolean } & PropsWithChildren> = ({
	children,
	showSkeleton
}) => {
	return (
		<div className="flex flex-col bg-section rounded-xl overflow-x-auto">
			{showSkeleton ? <ListSkeleton /> : children}
		</div>
	);
};

export const Item: FC<
	PropsWithChildren & { className?: string; style?: CSSProperties }
> = ({ children, className, style }) => {
	return (
		<div
			className={cn(
				'flex flex-row items-center gap-2 px-3 md:px-4 py-4',
				className
			)}
			style={style}>
			{children}
		</div>
	);
};

export const Content: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-row items-center gap-2 flex-1">{children}</div>
	);
};

export const Data: FC<
	PropsWithChildren & {
		strong?: boolean;
		className?: string;
		style?: CSSProperties;
	}
> = ({ children, strong, className, style }) => {
	return (
		<div
			className={cn(
				'body-3 text-neutral-strong flex-1 relative',
				strong && 'text-neutral font-bold',
				className
			)}
			style={style}>
			{children}
		</div>
	);
};

export const Actions: FC<PropsWithChildren> = ({ children }) => {
	const { setSize } = useActionsSizeContext();

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateWidth = () => {
			if (ref.current) {
				setSize(ref.current.offsetWidth);
			}
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	return (
		<div
			ref={ref}
			className="flex flex-row items-center gap-2 shrink-0 min-w-12 justify-end"
			onClick={(e) => e.stopPropagation()}>
			{children}
		</div>
	);
};

export const ListSkeleton = () => {
	return (
		<Items>
			{Array.from({ length: 3 }).map((_, index) => (
				<Item key={index}>
					<Content>
						<Data
							className="skeleton text-transparent w-full rounded-full"
							style={{
								animationDelay: `${-index * 0.5}s`
							}}>
							Loading...
						</Data>
					</Content>
				</Item>
			))}
		</Items>
	);
};
