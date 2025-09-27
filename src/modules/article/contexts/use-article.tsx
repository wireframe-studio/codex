'use client';

import { api } from '@/deps/trpc/react';
import { Spinner } from '@/global/components/spinner';
import { createContext, type ReactNode, useContext } from 'react';
import { type ArticleGetItem } from '../api/procedures/get-by-id';

interface ArticleContextType {
	articleId: string;
	article: ArticleGetItem;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({
	children,
	articleId
}: {
	children: ReactNode;
	articleId: string;
}) => {
	const article = api.article.get.useQuery({ articleId });

	if (article.isLoading) {
		return <Spinner className="border-neutral-medium" />;
	}

	return (
		<ArticleContext.Provider value={{ articleId, article: article.data! }}>
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
