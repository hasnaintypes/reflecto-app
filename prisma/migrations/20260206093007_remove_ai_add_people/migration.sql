/*
  Warnings:

  - You are about to drop the `AiInsight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Embedding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExportJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prompt` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "public"."EntryType" ADD VALUE 'note';

-- DropForeignKey
ALTER TABLE "public"."AiInsight" DROP CONSTRAINT "AiInsight_entryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AiInsight" DROP CONSTRAINT "AiInsight_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Embedding" DROP CONSTRAINT "Embedding_entryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExportJob" DROP CONSTRAINT "ExportJob_userId_fkey";

-- DropTable
DROP TABLE "public"."AiInsight";

-- DropTable
DROP TABLE "public"."Embedding";

-- DropTable
DROP TABLE "public"."ExportJob";

-- DropTable
DROP TABLE "public"."Prompt";

-- CreateTable
CREATE TABLE "public"."Person" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_EntryPeople" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EntryPeople_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Person_userId_idx" ON "public"."Person"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_userId_name_key" ON "public"."Person"("userId", "name");

-- CreateIndex
CREATE INDEX "_EntryPeople_B_index" ON "public"."_EntryPeople"("B");

-- AddForeignKey
ALTER TABLE "public"."Person" ADD CONSTRAINT "Person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EntryPeople" ADD CONSTRAINT "_EntryPeople_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EntryPeople" ADD CONSTRAINT "_EntryPeople_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
