-- AlterTable
ALTER TABLE "public"."Entry" ADD COLUMN     "isStarred" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Entry_userId_isStarred_idx" ON "public"."Entry"("userId", "isStarred");
