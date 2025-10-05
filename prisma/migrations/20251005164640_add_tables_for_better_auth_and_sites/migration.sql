/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_to_organization" DROP CONSTRAINT "user_to_organization_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "user_to_organization" DROP CONSTRAINT "user_to_organization_userId_fkey";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "user_to_organization";

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "webhookUrl" TEXT,
    "apiKey" TEXT,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_site" (
    "userId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,

    CONSTRAINT "user_to_site_pkey" PRIMARY KEY ("userId","siteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Site_apiKey_key" ON "Site"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_site_userId_siteId_key" ON "user_to_site"("userId", "siteId");

-- AddForeignKey
ALTER TABLE "user_to_site" ADD CONSTRAINT "user_to_site_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_site" ADD CONSTRAINT "user_to_site_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
