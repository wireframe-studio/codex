import { api } from '@/deps/trpc/react';
import { useUploadDialog } from '@/modules/file/hooks/use-upload-dialog';
import { useState } from 'react';

export const useGalleryGridNodeEdit = () => {
	const [isUploading, setIsUploading] = useState(false);

	const makeContentUploadUrl = api.file.makeContentUploadUrl.useMutation();
	const registerFile = api.file.registerFile.useMutation();

	const { openUploadDialog } = useUploadDialog();

	const handleUploadFile = async (
		file: File,
		successCallback: (fileId: string) => void
	) => {
		setIsUploading(true);

		const { url, key } = await makeContentUploadUrl.mutateAsync();

		// upload file to s3
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

		successCallback(remoteFile.id);

		setIsUploading(false);
	};

	const upload = (successCallback: (fileId: string) => void) => {
		openUploadDialog((files) => {
			console.log(files);
			handleUploadFile(files[0]!, successCallback);
		});
	};

	return { upload, isUploading };
};
