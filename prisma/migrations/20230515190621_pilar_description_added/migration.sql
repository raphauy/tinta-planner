/*
  Warnings:

  - Added the required column `description` to the `Pilar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pilar" ADD COLUMN     "description" TEXT NOT NULL;
