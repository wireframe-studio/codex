import { api } from '@/deps/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm
} from 'react-hook-form';
import { type TSiteUpdateSchema, siteUpdateSchema } from './site-update-schema';

export const useSiteUpdateForm = (siteId: string) => {
	// APIs
	const siteQuery = api.site.getById.useQuery({
		siteId
	});
	const updateMutation = api.site.update.useMutation();
	const utils = api.useUtils();

	// React Hook Form
	const form = useForm<TSiteUpdateSchema>({
		resolver: zodResolver(siteUpdateSchema),
		defaultValues: {
			name: siteQuery.data?.site.name,
			webhookUrl: siteQuery.data?.site.webhookUrl ?? undefined
		}
	});

	// Form submission
	const onValid: SubmitHandler<TSiteUpdateSchema> = async (data) => {
		await updateMutation.mutateAsync({ siteId, data });
		utils.site.getById.invalidate({ siteId });
	};

	const onInvalid: SubmitErrorHandler<TSiteUpdateSchema> = async (errors) => {
		console.warn(errors);
	};

	const handleSubmit = form.handleSubmit(onValid, onInvalid);

	return { form, handleSubmit };
};
