import { ArticleProvider } from '@/modules/article/contexts/use-article';
import { ArticleContentForm } from '@/modules/article/forms/article-content-form/article-content-form';
import { ArticleHeader } from '../components/article-header';

interface PageProps {
	params: Promise<{
		articleId: string;
	}>;
}

export const ArticlePage = async ({ params }: PageProps) => {
	const { articleId } = await params;

	return (
		<ArticleProvider articleId={articleId}>
			<div className="flex flex-col gap-10 w-full h-full overflow-y-scroll scrollbar-hidden">
				<ArticleHeader />

				<div className="px-6">
					<ArticleContentForm />
				</div>
			</div>
		</ArticleProvider>
	);
};
