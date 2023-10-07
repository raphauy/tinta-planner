-- CreateTable
CREATE TABLE "FechaImportante" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "FechaImportante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FechaImportante" ADD CONSTRAINT "FechaImportante_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
