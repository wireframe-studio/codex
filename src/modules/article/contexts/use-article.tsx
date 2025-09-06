import { createContext, ReactNode, useContext } from 'react';

interface ArticleContextType {
	articleId: string;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({
	children,
	articleId
}: {
	children: ReactNode;
	articleId: string;
}) => {
	return (
		<ArticleContext.Provider value={{ articleId }}>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticle = () => {
	const context = useContext(ArticleContext);

	if (context === undefined) {
		throw new Error('useArticle must be used within an ArticleProvider');
	}

	return context;
};
