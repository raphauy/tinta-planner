-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "comments" TEXT,
ALTER COLUMN "status" SET DEFAULT 'Draft';
