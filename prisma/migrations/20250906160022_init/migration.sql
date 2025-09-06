-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" JSONB,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "S3Object" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "S3Object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KV" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "KV_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "_ArticleToFile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArticleToFile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArticleToFile_B_index" ON "_ArticleToFile"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToFile" ADD CONSTRAINT "_ArticleToFile_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToFile" ADD CONSTRAINT "_ArticleToFile_B_fkey" FOREIGN KEY ("B") REFERENCES "S3Object"("id") ON DELETE CASCADE ON UPDATE CASCADE;
