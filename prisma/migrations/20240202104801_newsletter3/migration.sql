/*
  Warnings:

  - You are about to drop the column `sentAt` on the `Newsletter` table. All the data in the column will be lost.
  - You are about to drop the column `sentByName` on the `Newsletter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Newsletter" DROP COLUMN "sentAt",
DROP COLUMN "sentByName";
