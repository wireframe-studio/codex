'use client';

import { DatePicker } from '@/deps/shadcn/ui/date-picker';
import { Input } from '@/deps/shadcn/ui/input';
import { useArticleMetadataForm } from './use-article-metadata-update-form';

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

			<div className="text-neutral caption">Date</div>
			<DatePicker
				value={form.watch('date') ?? undefined}
				onChange={(date) => {
					form.setValue('date', date);
				}}
			/>

			<div className="text-neutral caption">Wireframe worthy</div>
			<Input
				className="text-neutral input"
				type="checkbox"
				placeholder="Wireframe worthy"
				{...form.register('companyVisibility')}
			/>

			{/* <div className="text-neutral caption">Author</div>
				<Input
					className="text-neutral input"
					type="text"
					placeholder="Author"
					{...form.register('author')}
				/> */}

			{/* <div className="text-neutral caption">Tags</div>
				<Input
					className="text-neutral input"
					type="text"
					placeholder="Tags"
					{...form.register('tags')}
				/> */}

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
