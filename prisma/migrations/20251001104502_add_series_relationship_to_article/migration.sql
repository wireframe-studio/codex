/*
  Warnings:

  - A unique constraint covering the columns `[seriesParentArticleId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "seriesParentArticleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Article_seriesParentArticleId_key" ON "Article"("seriesParentArticleId");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_seriesParentArticleId_fkey" FOREIGN KEY ("seriesParentArticleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
