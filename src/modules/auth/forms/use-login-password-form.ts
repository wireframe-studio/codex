import { zodResolver } from '@hookform/resolvers/zod';
import {
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm
} from 'react-hook-form';

import { api } from '@/deps/trpc/react';
import {
	TLoginPasswordSchema,
	loginPasswordSchema
} from './login-password-schema';

export const useLoginPasswordForm = () => {
	// APIs
	const loginMutation = api.auth.login.useMutation();

	// React Hook Form
	const form = useForm<TLoginPasswordSchema>({
		resolver: zodResolver(loginPasswordSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onValid: SubmitHandler<TLoginPasswordSchema> = async (data) => {
		await loginMutation.mutateAsync(data);
		window.alert('Login successful');
	};

	const onInvalid: SubmitErrorHandler<TLoginPasswordSchema> = async (
		errors
	) => {
		console.warn(errors);
	};

	const handleSubmit = form.handleSubmit(onValid, onInvalid);

	return { form, handleSubmit };
};
