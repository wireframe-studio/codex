'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { type IconName } from '@/global/components/icon';
import { useMemo, useState } from 'react';
// Import icons for the component to work
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/deps/shadcn/ui/popover';

export interface IconPickerProps {
	onSelect?: (icon: IconName | null) => void;
	selectedIcon?: IconName;
	className?: string;
	searchable?: boolean;
	clearable?: boolean;
}

export const IconPicker: React.FC<IconPickerProps> = ({
	onSelect,
	selectedIcon,
	className,
	clearable = true
	// searchable = true
}) => {
	const [searchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	// Get all available icons
	const allIcons = useMemo(() => {
		// return Object.keys(icons) as IconName[];
		const icons = [
			'lungs',
			'xray',
			'stethoscope',
			'syringe',
			'checkup',
			'health-cursor',
			'pills',
			'doctor',
			'heartrate-monitor',
			'heart',
			'virus',
			'lips',
			'list-board',
			'user',
			'food-carrot',
			'arm'
		] satisfies IconName[];
		return icons;
	}, []);

	// Filter icons based on search term
	const filteredIcons = useMemo(() => {
		if (!searchTerm.trim()) return allIcons;

		return allIcons.filter((iconName) =>
			iconName.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [allIcons, searchTerm]);

	const handleIconSelect = (icon: IconName | null) => {
		onSelect?.(icon);
		setIsOpen(false);
	};

	// const placeholder = `Search ${allIcons.length} icons...`;

	const IconsList = () => (
		<div
			className={cn('flex flex-col gap-2 h-full overflow-hidden', className)}>
			{clearable && (
				<div className="pt-2 px-2">
					<Button
						variant="solid-weak"
						theme="neutral"
						size="sm"
						className="w-full"
						rightIcon="close"
						onClick={() => handleIconSelect(null)}>
						Remove icon
					</Button>
				</div>
			)}

			{/* {searchable && (
				<div className="relative px-4 py-4">
					<Input
						type="text"
						placeholder={placeholder}
						defaultValue={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="relative"
					/>
					<Icon
						icon="search"
						className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 bg-neutral-strong"
					/>
				</div>
			)} */}

			<div className="flex flex-wrap gap-2 justify-start p-4 overflow-y-scroll">
				{filteredIcons.map((iconName) => (
					<Button
						key={iconName}
						variant={selectedIcon === iconName ? 'solid' : 'ghost'}
						theme={selectedIcon === iconName ? 'accent' : 'neutral'}
						size="sm"
						type="button"
						singleIcon={iconName}
						onClick={() => handleIconSelect(iconName)}
						className={cn(
							'aspect-square',
							selectedIcon === iconName && 'ring-2 ring-accent ring-offset-2'
						)}
						title={iconName}
					/>
				))}
			</div>

			{filteredIcons.length === 0 && searchTerm && (
				<div className="text-center py-8 text-neutral-strong">
					<p>No icons found matching "{searchTerm}"</p>
				</div>
			)}
		</div>
	);

	return (
		<Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="solid-weak"
					singleIcon={selectedIcon}
					hasSingleIcon={true}
					className="rounded-lg border border-neutral-medium bg-section"
				/>
			</PopoverTrigger>
			<PopoverContent className="w-[306px] max-h-[240px] overflow-hidden p-0">
				<IconsList />
			</PopoverContent>
		</Popover>
	);
};
