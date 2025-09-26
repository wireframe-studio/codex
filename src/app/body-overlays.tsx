import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

export const BodyOverlays = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<NextTopLoader
				color="#d18547"
				shadow={false}
				showSpinner={false}
				height={4}
			/>
			{children}
			<Toaster />
		</>
	);
};
