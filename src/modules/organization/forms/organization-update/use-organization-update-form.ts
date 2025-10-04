import { api } from '@/deps/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm
} from 'react-hook-form';
import {
	type TOrganizationUpdateSchema,
	organizationUpdateSchema
} from './organization-update-schema';

export const useOrganizationUpdateForm = (organizationId: string) => {
	// APIs
	const organizationQuery = api.organization.getById.useQuery({
		organizationId
	});
	const updateMutation = api.organization.update.useMutation();
	const utils = api.useUtils();

	// React Hook Form
	const form = useForm<TOrganizationUpdateSchema>({
		resolver: zodResolver(organizationUpdateSchema),
		defaultValues: {
			name: organizationQuery.data?.organization.name,
			webhookUrl: organizationQuery.data?.organization.webhookUrl ?? undefined
		}
	});

	// Form submission
	const onValid: SubmitHandler<TOrganizationUpdateSchema> = async (data) => {
		await updateMutation.mutateAsync({ organizationId, data });
		utils.organization.getById.invalidate({ organizationId });
	};

	const onInvalid: SubmitErrorHandler<TOrganizationUpdateSchema> = async (
		errors
	) => {
		console.warn(errors);
	};

	const handleSubmit = form.handleSubmit(onValid, onInvalid);

	return { form, handleSubmit };
};
