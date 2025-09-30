import { api } from '@/deps/trpc/react';
import { debounce } from '@/global/utils/debounced-callback';
import { useArticle } from '@/modules/article/contexts/use-article';
import { zodResolver } from '@hookform/resolvers/zod';
import { createHash } from 'crypto';
import { useEffect, useRef } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
	articleMetadataUpdateSchema,
	type TArticleMetadataUpdateSchema
} from './article-metadata-update-schema';

// create a hash based on arbitrary data
const calculateHash = (data: unknown) => {
	return createHash('sha256').update(JSON.stringify(data)).digest('hex');
};

export const useArticleMetadataForm = () => {
	const { articleId } = useArticle();
	const isUpdatingFromSubmission = useRef(false);

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
		defaultValues: {
			tags: []
		}
	});

	// Remote metadata
	useEffect(() => {
		if (article.data && !isUpdatingFromSubmission.current) {
			const remoteHash = calculateHash({
				title: article.data.title,
				tags: article.data.tags,
				description: article.data.description,
				date: article.data.date,
				type: article.data.type,
				companyVisibility: article.data.companyVisibility,
				published: article.data.published,
				slug: article.data.slug
			});

			const localValues = {
				title: form.getValues().title,
				tags: form.getValues().tags,
				description: form.getValues().description,
				date: form.getValues().date,
				type: form.getValues().type,
				companyVisibility: form.getValues().companyVisibility,
				published: form.getValues().published,
				slug: form.getValues().slug
			};
			const localHash = calculateHash(localValues);

			if (remoteHash !== localHash) {
				form.reset({
					title: article.data.title,
					tags: article.data.tags || [],
					description: article.data.description,
					date: article.data.date,
					type: article.data.type ?? undefined,
					companyVisibility: article.data.companyVisibility,
					published: article.data.published,
					slug: article.data.slug ?? undefined
				});
			}
		}
	}, [article.data]);

	// Form submission
	const onValid: SubmitHandler<TArticleMetadataUpdateSchema> = async (data) => {
		isUpdatingFromSubmission.current = true;

		const updatedArticle = await updateMetadata.mutateAsync({
			articleId: articleId,
			metadata: {
				title: data.title,
				tags: data.tags,
				companyVisibility: data.companyVisibility,
				date: data.date,
				type: data.type,
				published: data.published,
				description: data.description,
				slug: data.slug
			}
		});

		// Update the form with the response data to prevent reset
		form.reset({
			title: updatedArticle.article.title,
			tags: updatedArticle.article.tags || [],
			description: updatedArticle.article.description,
			date: updatedArticle.article.date,
			type: updatedArticle.article.type ?? undefined,
			companyVisibility: updatedArticle.article.companyVisibility,
			published: updatedArticle.article.published,
			slug: updatedArticle.article.slug ?? undefined
		});

		// utils.article.get.invalidate({ articleId: articleId! });
		utils.article.get.setData({ articleId: articleId }, (prev) => ({
			prev,
			...updatedArticle.article
		}));

		utils.article.list.invalidate();

		// Reset the flag after a short delay
		setTimeout(() => {
			isUpdatingFromSubmission.current = false;
		}, 100);
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
			callback: ({ isDirty }) => {
				if (!isDirty) return;
				debouncedSubmit();
			}
		});
	}, []);

	return { form };
};
