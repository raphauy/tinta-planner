-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "format" DROP NOT NULL,
ALTER COLUMN "hashtags" DROP NOT NULL,
ALTER COLUMN "copy" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL;
