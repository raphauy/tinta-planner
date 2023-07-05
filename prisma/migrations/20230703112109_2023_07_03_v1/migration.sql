-- CreateTable
CREATE TABLE "Wine" (
    "id" TEXT NOT NULL,
    "winery" TEXT NOT NULL,
    "wine" TEXT NOT NULL,
    "winemaker" TEXT,
    "region" TEXT NOT NULL,
    "vintage" TEXT NOT NULL,
    "grapes" TEXT NOT NULL,
    "style" TEXT,
    "notes" TEXT,
    "price" DOUBLE PRECISION,
    "image" TEXT DEFAULT 'https://res.cloudinary.com/dtm41dmrz/image/upload/v1688035104/wines/wine-placeholder.jpg',
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Wine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wine" ADD CONSTRAINT "Wine_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
