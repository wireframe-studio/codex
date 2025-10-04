'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { type FC } from 'react';
import { useUserUpdateForm } from './use-user-update-form';

export const UserUpdateForm: FC<{ userId: string }> = ({ userId }) => {
	const { form, handleSubmit } = useUserUpdateForm(userId);

	return (
		<>
			<FormLabel title="Name" error={form.formState.errors.name?.message}>
				<Input {...form.register('name')} />
			</FormLabel>

			<FormLabel title="Email" error={form.formState.errors.email?.message}>
				<Input {...form.register('email')} />
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
