export const useUploadDialog = () => {
	const openUploadDialog = async (
		addFilesCallback: (files: File[]) => void
	) => {
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = true;
		input.onchange = async (e) => {
			const files = (e.target as HTMLInputElement).files;
			if (!files) return;

			addFilesCallback(Array.from(files));
		};

		input.click();
	};

	return { openUploadDialog };
};
