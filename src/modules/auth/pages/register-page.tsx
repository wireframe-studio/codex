import Image from 'next/image';
import { RegisterPasswordForm } from '../forms/register-password/register-password-form';

export const RegisterPage = () => {
	return (
		<div className="flex flex-col w-full gap-10 items-center justify-center relative">
			<Image src="/bg.svg" alt="Cover" fill className="object-cover" />
			<div className="flex flex-col gap-10 container-sm my-20 p-8 rounded-lg border border-neutral-weak bg-section">
				<RegisterPasswordForm />
			</div>
		</div>
	);
};
