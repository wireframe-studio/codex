import { api } from '@/deps/trpc/react';
import { debounce } from '@/global/utils/debounced-callback';
import { useArticle } from '@/modules/article/contexts/use-article';
import { zodResolver } from '@hookform/resolvers/zod';
import { createHash } from 'crypto';
import { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import {
	articleMetadataUpdateSchema,
	TArticleMetadataUpdateSchema
} from './article-metadata-update-schema';

// create a hash based on arbitrary data
const calculateHash = (data: any) => {
	return createHash('sha256').update(JSON.stringify(data)).digest('hex');
};

export const useArticleMetadataForm = () => {
	const { articleId } = useArticle();

	// APIs
	const article = api.article.get.useQuery(
		{ articleId: articleId },
		{ enabled: !!articleId }
	);
	const updateMetadata = api.article.metadata.update.useMutation();
	const utils = api.useUtils();

	// React Hook Form
	const form = useForm<TArticleMetadataUpdateSchema>({
		resolver: zodResolver(articleMetadataUpdateSchema),
		defaultValues: {}
	});

	// Remote metadata
	useEffect(() => {
		if (article.data) {
			const remoteHash = calculateHash({
				title: article.data.title,
				description: article.data.description,
				date: article.data.date,
				type: article.data.type,
				companyVisibility: article.data.companyVisibility,
				published: article.data.published
			});

			const localValues = {
				title: form.getValues().title,
				description: form.getValues().description,
				date: form.getValues().date,
				type: form.getValues().type,
				companyVisibility: form.getValues().companyVisibility,
				published: form.getValues().published
			};
			const localHash = calculateHash(localValues);

			if (remoteHash !== localHash) {
				form.reset({
					title: article.data.title,
					description: article.data.description,
					date: article.data.date,
					type: article.data.type ?? undefined,
					companyVisibility: article.data.companyVisibility,
					published: article.data.published
				});
			}
		}
	}, [article.data]);

	// Form submission
	const onValid: SubmitHandler<TArticleMetadataUpdateSchema> = async (data) => {
		const updatedArticle = await updateMetadata.mutateAsync({
			articleId: articleId,
			metadata: {
				title: data.title,
				companyVisibility: data.companyVisibility,
				date: data.date,
				type: data.type,
				published: data.published,
				description: data.description
			}
		});

		// utils.article.get.invalidate({ articleId: articleId! });
		utils.article.get.setData({ articleId: articleId }, (prev) => ({
			prev,
			...updatedArticle.article
		}));

		utils.article.list.invalidate();
	};

	const onInvalid: SubmitErrorHandler<TArticleMetadataUpdateSchema> = (
		errors
	) => {
		console.warn(errors);
	};

	const debouncedSubmit = debounce(() => {
		form.handleSubmit(onValid, onInvalid)();
	}, 1000);

	useEffect(() => {
		return form.subscribe({
			formState: {
				values: true,
				isDirty: true
			},
			callback: ({ values, isDirty }) => {
				if (!isDirty) return;
				debouncedSubmit();
			}
		});
	}, []);

	return { form };
};
