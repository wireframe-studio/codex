import { zodResolver } from '@hookform/resolvers/zod';
import {
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm
} from 'react-hook-form';

import { api } from '@/deps/trpc/react';
import { type TUserUpdateSchema, userUpdateSchema } from './user-update-schema';

export const useUserUpdateForm = (userId: string) => {
	// APIs
	const userQuery = api.user.getById.useQuery({ userId });
	const updateMutation = api.user.update.useMutation();
	const utils = api.useUtils();

	// React Hook Form
	const form = useForm<TUserUpdateSchema>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			name: userQuery.data?.user.name,
			email: userQuery.data?.user.email
		}
	});

	// Form submission
	const onValid: SubmitHandler<TUserUpdateSchema> = async (data) => {
		await updateMutation.mutateAsync({ userId, data });
		utils.user.getById.invalidate({ userId });
		form.reset(userQuery.data?.user);
	};

	const onInvalid: SubmitErrorHandler<TUserUpdateSchema> = async (errors) => {
		console.warn(errors);
	};

	const handleSubmit = form.handleSubmit(onValid, onInvalid);

	return { form, handleSubmit };
};
