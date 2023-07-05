/*
  Warnings:

  - You are about to drop the `Wine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wine" DROP CONSTRAINT "Wine_clientId_fkey";

-- DropTable
DROP TABLE "Wine";
