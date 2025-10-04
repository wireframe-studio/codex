'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { useLoginPasswordForm } from './use-login-password-form';

export const LoginPasswordForm = () => {
	const { form, handleSubmit } = useLoginPasswordForm();

	return (
		<>
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
