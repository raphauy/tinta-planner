/*
  Warnings:

  - You are about to drop the column `content` on the `Newsletter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Newsletter" DROP COLUMN "content",
ADD COLUMN     "contentHtml" TEXT,
ADD COLUMN     "contentJson" TEXT;
