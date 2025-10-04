import { zodResolver } from '@hookform/resolvers/zod';
import {
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm
} from 'react-hook-form';

import { authClient } from '@/deps/better-auth/auth-client';
import {
	type TLoginPasswordSchema,
	loginPasswordSchema
} from './login-password-schema';

export const useLoginPasswordForm = () => {
	// React Hook Form
	const form = useForm<TLoginPasswordSchema>({
		resolver: zodResolver(loginPasswordSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onValid: SubmitHandler<TLoginPasswordSchema> = async (data) => {
		await authClient.signIn.email({ ...data, callbackURL: '/' });
	};

	const onInvalid: SubmitErrorHandler<TLoginPasswordSchema> = async (
		errors
	) => {
		console.warn(errors);
	};

	const handleSubmit = form.handleSubmit(onValid, onInvalid);

	return { form, handleSubmit };
};
