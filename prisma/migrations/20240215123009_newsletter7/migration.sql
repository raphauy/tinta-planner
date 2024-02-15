/*
  Warnings:

  - You are about to drop the column `banners` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "banners",
ADD COLUMN     "banner" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dtm41dmrz/image/upload/v1707992892/tinta-posts/caucrfygvq9yun468q7z.jpg',
ADD COLUMN     "footerText" TEXT NOT NULL DEFAULT 'Tinta Wine - Agencia de Marketing Digital para Bodegas';
