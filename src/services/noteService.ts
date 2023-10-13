import { TitleFormValues } from "@/app/agency/[slug]/crm/leads/[leadId]/title-form";
import { prisma } from "../app/(server-side)/db";


export async function updateTitle(id: string, data: TitleFormValues) {

  const updated= await prisma.note.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })

  return updated
}
