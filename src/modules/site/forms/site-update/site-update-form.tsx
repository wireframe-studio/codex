'use client';

import { type FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { useSiteUpdateForm } from './use-site-update-form';

export const SiteUpdateForm: FC<{ siteId: string }> = ({ siteId }) => {
	const { form, handleSubmit } = useSiteUpdateForm(siteId);

	return (
		<>
			<FormLabel title="Name" error={form.formState.errors.name?.message}>
				<Input {...form.register('name')} />
			</FormLabel>

			<FormLabel
				title="Webhook URL"
				error={form.formState.errors.webhookUrl?.message}>
				<Input {...form.register('webhookUrl')} />
			</FormLabel>

			<Button
				type="button"
				loading={form.formState.isSubmitting}
				disabled={form.formState.isValid}
				onClick={handleSubmit}>
				Save
			</Button>
		</>
	);
};
