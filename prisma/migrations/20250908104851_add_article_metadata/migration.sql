-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('BLOG', 'CASE_STUDY');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "companyVisibility" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reactions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'New Article',
ADD COLUMN     "type" "ArticleType" DEFAULT 'BLOG',
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
