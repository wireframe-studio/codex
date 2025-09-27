'use client';

import { DatePicker } from '@/deps/shadcn/ui/date-picker';
import { Input } from '@/deps/shadcn/ui/input';
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
