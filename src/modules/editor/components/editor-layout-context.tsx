'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface EditorLayoutContextType {
	articleId: string | null;
	setArticleId: (articleId: string | null) => void;
}

const EditorLayoutContext = createContext<EditorLayoutContextType>({
	articleId: null,
	setArticleId: () => {}
});
export const EditorLayoutProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [articleId, setArticleId] = useState<string | null>(null);

	// load articleId from url
	useEffect(() => {
		const url = new URL(window.location.href);
		const articleId = url.searchParams.get('articleId');
		if (articleId) {
			setArticleId(articleId);
		}
	}, []);

	// save articleId to url
	useEffect(() => {
		if (articleId) {
			const url = new URL(window.location.href);
			if (url.searchParams.get('articleId') !== articleId) {
				url.searchParams.set('articleId', articleId);
				window.history.replaceState({}, '', url.toString());
			}
		} else {
			const url = new URL(window.location.href);
			if (url.searchParams.has('articleId')) {
				url.searchParams.delete('articleId');
				window.history.replaceState({}, '', url.toString());
			}
		}
	}, [articleId]);

	return (
		<EditorLayoutContext.Provider value={{ articleId, setArticleId }}>
			{children}
		</EditorLayoutContext.Provider>
	);
};
export const useEditorLayout = () => {
	const context = useContext(EditorLayoutContext);

	if (context === undefined) {
		throw new Error(
			'useEditorLayout must be used within an EditorLayoutProvider'
		);
	}

	return context;
};
