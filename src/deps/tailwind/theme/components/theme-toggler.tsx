'use client';

import { useEffect, useState, type FC } from 'react';

import { useTheme } from '../providers/theme-provider';

import { Button, type ButtonProps } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';

export const ThemeToggler: FC<ButtonProps> = ({ className, ...props }) => {
	const { theme, toggleTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [time, setTime] = useState(0);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const isSpinning = Date.now() - time < 500 || isHovering;

	const handleClick = () => {
		setTime(Date.now());
		toggleTheme();
	};

	return (
		<Button
			{...props}
			onMouseOver={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={handleClick}
			className={cn(className)}
			singleIcon={theme === 'light' ? 'mode-light' : 'mode-dark'}
		/>
	);
};
