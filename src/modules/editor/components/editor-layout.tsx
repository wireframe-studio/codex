import { Content } from './content';
import { EditorLayoutProvider } from './editor-layout-context';
import { Sidebar } from './sidebar';

export const EditorLayout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div className="flex flex-row h-screen w-screen overflow-hidden">
			<EditorLayoutProvider>
				<Sidebar />
				<Content />
			</EditorLayoutProvider>
		</div>
	);
};
