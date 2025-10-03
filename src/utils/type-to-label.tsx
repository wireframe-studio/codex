import { ArticleType } from '@prisma/client';

export const typeToLabel = (type: ArticleType) => {
	switch (type) {
		case ArticleType.BLOG:
			return 'Blog';
		case ArticleType.CASE_STUDY:
			return 'Case Study';
		case ArticleType.SHOWCASE:
			return 'Showcase';
		case ArticleType.SERIES_OVERVIEW:
			return 'Series Overview';
	}
};
