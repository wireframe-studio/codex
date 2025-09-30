import { Sidebar } from './sidebar';

export const EditorLayout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div className="flex flex-row h-screen w-screen overflow-hidden relative">
			<Sidebar />
			{children}
		</div>
	);
};
