import { Button } from '@/deps/shadcn/ui/button';
import { useUploadFile } from '@/deps/tiptap/hooks/use-upload-file';
import { api } from '@/deps/trpc/react';
import { useArticle } from '@/modules/article/contexts/use-article';

export const ArticleImagesForm = () => {
	const { articleId, article } = useArticle();

	const updateImage = api.article.image.update.useMutation();
	const utils = api.useUtils();

	const coverImage = useUploadFile(article.coverImageId ?? undefined);
	const backgroundImage = useUploadFile(article.backgroundImageId ?? undefined);

	const handleCoverImageUpload = () => {
		coverImage.upload(async (fileId) => {
			await updateImage.mutateAsync({
				articleId: articleId,
				coverImageId: fileId
			});

			utils.article.get.invalidate({ articleId: articleId });
		});
	};

	const handleBackgroundImageUpload = () => {
		backgroundImage.upload(async (fileId) => {
			await updateImage.mutateAsync({
				articleId: articleId,
				backgroundImageId: fileId
			});

			utils.article.get.invalidate({ articleId: articleId });
		});
	};

	const handleCoverImageRemove = () => {
		coverImage.remove(async () => {
			await updateImage.mutateAsync({
				articleId: articleId,
				coverImageId: null
			});

			utils.article.get.invalidate({ articleId: articleId });
		});
	};

	const handleBackgroundImageRemove = () => {
		backgroundImage.remove(async () => {
			await updateImage.mutateAsync({
				articleId: articleId,
				backgroundImageId: null
			});

			utils.article.get.invalidate({ articleId: articleId });
		});
	};

	return (
		<div className="grid grid-cols-2 gap-2 p-4">
			<div className="flex flex-col">
				<div className="text-neutral caption">Cover Image</div>
				<div className="bg-neutral-weak rounded-lg overflow-hidden aspect-video max-w-[240px] w-full relative">
					{coverImage.file.url && (
						<img
							src={coverImage.file.url}
							alt="Cover Image"
							className="w-full h-full object-cover"
						/>
					)}

					{!coverImage.file.id && (
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<Button
								variant="solid-weak"
								size="sm"
								singleIcon="upload"
								onClick={handleCoverImageUpload}
							/>
						</div>
					)}

					{coverImage.file.id && (
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<Button
								variant="solid-weak"
								size="sm"
								singleIcon="close"
								onClick={handleCoverImageRemove}
							/>
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col">
				<div className="text-neutral caption">Background Image</div>
				<div className="bg-neutral-weak rounded-lg overflow-hidden aspect-video max-w-[240px] w-full relative">
					{backgroundImage.file.url && (
						<img
							src={backgroundImage.file.url}
							alt="Background Image"
							className="w-full h-full object-cover"
						/>
					)}

					{!backgroundImage.file.id && (
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<Button
								variant="solid-weak"
								size="sm"
								singleIcon="upload"
								onClick={handleBackgroundImageUpload}
							/>
						</div>
					)}

					{backgroundImage.file.id && (
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<Button
								variant="solid-weak"
								size="sm"
								singleIcon="close"
								onClick={handleBackgroundImageRemove}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
