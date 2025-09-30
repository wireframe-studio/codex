'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { DatePicker } from '@/deps/shadcn/ui/date-picker';
import { Input } from '@/deps/shadcn/ui/input';
import { useRef, useState } from 'react';
import { useArticleMetadataForm } from './use-article-metadata-update-form';

const transformDate = (date: Date | null | undefined) => {
	if (!date) return date;

	const newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0);

	// set time to 00:00:00
	return new Date(date);
};

export const ArticleMetadataUpdateForm = () => {
	const { form } = useArticleMetadataForm();

	const [tagInput, setTagInput] = useState('');
	const tagInputRef = useRef<HTMLInputElement>(null);
	const handleTagsClick = () => {
		if (tagInputRef.current) {
			tagInputRef.current.focus();
		}
	};

	return (
		<form
			className="grid items-center gap-2 p-4 bg-section rounded-md"
			style={{ gridTemplateColumns: 'auto 1fr' }}>
			<div className="text-neutral caption">Title</div>
			<Input
				className="text-neutral input"
				type="text"
				placeholder="Title"
				{...form.register('title')}
			/>

			<div className="text-neutral caption">Description</div>
			<Input
				className="text-neutral input"
				type="text"
				placeholder="Description"
				{...form.register('description')}
			/>

			<div className="text-neutral caption">Slug</div>
			<Input
				className="text-neutral input"
				type="text"
				placeholder="Slug"
				{...form.register('slug')}
			/>

			<div className="text-neutral caption">Tags</div>
			{/* <Input
				className="text-neutral input"
				type="text"
				placeholder="Tags"
				{...form.register('tags')}
				value={form.watch('tags')?.join(',')}
				onChange={(e) => {
					form.setValue('tags', e.target.value.split(','), {
						shouldDirty: true
					});
				}}
			/> */}
			<div
				className="flex flex-wrap flex-row gap-1 p-2 border border-neutral-medium rounded-lg"
				onClick={handleTagsClick}>
				{form.watch('tags')?.map((tag, index) => (
					<Button
						key={index}
						className="text-neutral caption"
						variant="solid-weak"
						size="xs"
						rightIcon="close"
						type="button"
						onClick={() =>
							form.setValue(
								'tags',
								form.watch('tags')?.filter((_, i) => i !== index)
							)
						}>
						{tag}
					</Button>
				))}

				<input
					ref={tagInputRef}
					className="text-neutral button-sm w-fit min-w-0 ml-1 outline-none"
					type="text"
					placeholder="Tags"
					onChange={(e) => setTagInput(e.target.value)}
					value={tagInput}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							const newTag = tagInput.trim();
							if (newTag) {
								const currentTags = form.getValues('tags') || [];
								form.setValue('tags', [...currentTags, newTag], {
									shouldDirty: true
								});
								setTagInput('');
							}
						}
					}}
				/>
			</div>

			<div className="text-neutral caption">Date</div>
			<DatePicker
				value={transformDate(form.watch('date')) ?? undefined}
				onChange={(date) => {
					form.setValue('date', transformDate(date), {
						shouldDirty: true
					});
				}}
			/>

			<div className="text-neutral caption">Public visibility</div>
			<Input
				className="text-neutral input"
				type="checkbox"
				{...form.register('published')}
			/>

			<div className="text-neutral caption">Showcase visibility</div>
			<Input
				className="text-neutral input"
				type="checkbox"
				{...form.register('companyVisibility')}
			/>

			<div className="text-neutral caption">Type</div>
			<Input
				className="text-neutral input"
				type="text"
				placeholder="Type"
				{...form.register('type')}
			/>
		</form>
	);
};
