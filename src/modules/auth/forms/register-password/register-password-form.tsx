'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { useRegisterPasswordForm } from './use-register-password-form';

export const RegisterPasswordForm = () => {
	const { form, handleSubmit } = useRegisterPasswordForm();

	return (
		<>
			<FormLabel title="Name" error={form.formState.errors.name?.message}>
				<Input {...form.register('name')} />
			</FormLabel>

			<FormLabel title="Email" error={form.formState.errors.email?.message}>
				<Input {...form.register('email')} />
			</FormLabel>

			<FormLabel
				title="Password"
				error={form.formState.errors.password?.message}>
				<Input {...form.register('password')} type="password" />
			</FormLabel>

			<Button
				type="button"
				loading={form.formState.isSubmitting}
				disabled={!form.formState.isValid}
				onClick={handleSubmit}>
				Save
			</Button>
		</>
	);
};
