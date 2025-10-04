'use client';

import { type FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { useOrganizationUpdateForm } from './use-organization-update-form';

export const OrganizationUpdateForm: FC<{ organizationId: string }> = ({
	organizationId
}) => {
	const { form, handleSubmit } = useOrganizationUpdateForm(organizationId);

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
