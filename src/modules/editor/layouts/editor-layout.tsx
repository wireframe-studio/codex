import { Sidebar } from '../components/sidebar';

export const EditorLayout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div className="flex flex-row h-screen w-screen overflow-hidden">
			<Sidebar />
			{children}
		</div>
	);
};
