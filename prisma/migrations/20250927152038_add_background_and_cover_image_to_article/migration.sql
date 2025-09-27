/*
  Warnings:

  - A unique constraint covering the columns `[coverImageId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[backgroundImageId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "backgroundImageId" TEXT,
ADD COLUMN     "coverImageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Article_coverImageId_key" ON "Article"("coverImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Article_backgroundImageId_key" ON "Article"("backgroundImageId");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "S3Object"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "S3Object"("id") ON DELETE SET NULL ON UPDATE CASCADE;
