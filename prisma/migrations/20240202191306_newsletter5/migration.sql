/*
  Warnings:

  - Added the required column `clientId` to the `Envio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Envio" ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
