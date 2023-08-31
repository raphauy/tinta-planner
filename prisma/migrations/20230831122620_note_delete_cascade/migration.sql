-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_leadId_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
