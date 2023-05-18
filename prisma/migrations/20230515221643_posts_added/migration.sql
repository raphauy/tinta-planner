-- DropForeignKey
ALTER TABLE "Pilar" DROP CONSTRAINT "Pilar_clientId_fkey";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "hashtags" TEXT NOT NULL,
    "copy" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "pilarId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pilar" ADD CONSTRAINT "Pilar_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_pilarId_fkey" FOREIGN KEY ("pilarId") REFERENCES "Pilar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
