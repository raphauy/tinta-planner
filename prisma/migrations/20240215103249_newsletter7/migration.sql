-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "banners" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dtm41dmrz/image/upload/v1707992892/tinta-posts/caucrfygvq9yun468q7z.jpg',
ADD COLUMN     "linkHref" TEXT NOT NULL DEFAULT 'https://tinta.wine',
ADD COLUMN     "linkText" TEXT NOT NULL DEFAULT 'Conocé más';
