import { zodResolver } from '@hookform/resolvers/zod';
import {
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm
} from 'react-hook-form';

import { authClient } from '@/deps/better-auth/auth-client';
import {
	type TRegisterPasswordSchema,
	registerPasswordSchema
} from './register-password-schema';

export const useRegisterPasswordForm = () => {
	// React Hook Form
	const form = useForm<TRegisterPasswordSchema>({
		resolver: zodResolver(registerPasswordSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	const onValid: SubmitHandler<TRegisterPasswordSchema> = async (data) => {
		console.log(data);

		await authClient.signUp.email({ ...data, callbackURL: '/' });
	};

	const onInvalid: SubmitErrorHandler<TRegisterPasswordSchema> = async (
		errors
	) => {
		console.warn(errors);
	};

	const handleSubmit = form.handleSubmit(onValid, onInvalid);

	return { form, handleSubmit };
};
