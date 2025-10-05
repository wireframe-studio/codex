/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- Conditionally drop foreign keys and tables (they may not exist if CI already dropped them)
DO $$ 
BEGIN
    -- Drop foreign key constraints if they exist
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'user_to_organization_organizationId_fkey') THEN
        ALTER TABLE "user_to_organization" DROP CONSTRAINT "user_to_organization_organizationId_fkey";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'user_to_organization_userId_fkey') THEN
        ALTER TABLE "user_to_organization" DROP CONSTRAINT "user_to_organization_userId_fkey";
    END IF;
    
    -- Drop tables if they exist
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_to_organization') THEN
        DROP TABLE "user_to_organization";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Organization') THEN
        DROP TABLE "Organization";
    END IF;
END $$;

-- Conditionally create tables and constraints (they may already exist from CI)
DO $$ 
BEGIN
    -- Create Site table if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Site') THEN
        CREATE TABLE "Site" (
            "id" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,
            "name" TEXT NOT NULL,
            "webhookUrl" TEXT,
            "apiKey" TEXT,

            CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
        );
    END IF;
    
    -- Create user_to_site table if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_to_site') THEN
        CREATE TABLE "user_to_site" (
            "userId" TEXT NOT NULL,
            "siteId" TEXT NOT NULL,

            CONSTRAINT "user_to_site_pkey" PRIMARY KEY ("userId","siteId")
        );
    END IF;
END $$;

-- Create indexes if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'Site_apiKey_key') THEN
        CREATE UNIQUE INDEX "Site_apiKey_key" ON "Site"("apiKey");
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'user_to_site_userId_siteId_key') THEN
        CREATE UNIQUE INDEX "user_to_site_userId_siteId_key" ON "user_to_site"("userId", "siteId");
    END IF;
END $$;

-- Add foreign key constraints if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'user_to_site_userId_fkey') THEN
        ALTER TABLE "user_to_site" ADD CONSTRAINT "user_to_site_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'user_to_site_siteId_fkey') THEN
        ALTER TABLE "user_to_site" ADD CONSTRAINT "user_to_site_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
