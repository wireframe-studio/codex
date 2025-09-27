import { api } from '@/deps/trpc/react';
import { useUploadDialog } from '@/modules/file/hooks/use-upload-dialog';
import { useState } from 'react';

export const useUploadFile = (_fileId?: string) => {
	const [fileId, setFileId] = useState<string | null>(_fileId ?? null);
	const [isLoading, setIsLoading] = useState(false);

	const { openUploadDialog } = useUploadDialog();

	const makeContentUploadUrl = api.file.makeContentUploadUrl.useMutation();
	const registerFile = api.file.registerFile.useMutation();
	const deleteFile = api.file.deleteFileById.useMutation();

	const downloadUrl = api.file.getFileDownloadUrl.useQuery(
		{ fileId: fileId! },
		{ enabled: !!fileId }
	);

	const upload = (
		successCallback: (fileId: string, fileKey: string, fileUrl: string) => void
	) => {
		openUploadDialog(async (files) => {
			const file = files[0];

			setIsLoading(true);

			const { url, key } = await makeContentUploadUrl.mutateAsync();
			await fetch(url, {
				method: 'PUT',
				body: file,
				headers: { 'Content-Type': file.type }
			});
			const { file: remoteFile } = await registerFile.mutateAsync({
				key,
				contentType: file.type,
				size: file.size
			});

			setFileId(remoteFile.id);

			successCallback(remoteFile.id, remoteFile.key, remoteFile.url);
			setIsLoading(false);
		});
	};

	const remove = async (successCallback: () => void) => {
		setIsLoading(true);

		await deleteFile.mutateAsync({ fileId: fileId! });
		setFileId(null);

		successCallback();
		setIsLoading(false);
	};

	return {
		isLoading,
		upload,
		remove,
		file: { id: fileId, url: fileId ? downloadUrl.data : null }
	};
};
