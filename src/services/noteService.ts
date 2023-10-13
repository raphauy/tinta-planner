import { TitleFormValues } from "@/app/agency/[slug]/crm/leads/[leadId]/title-form";
import { prisma } from "../app/(server-side)/db";
import { DescriptionFormValues } from "@/app/agency/[slug]/crm/leads/[leadId]/description-form";


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

export async function updateDescription(id: string, data: DescriptionFormValues) {

  const updated= await prisma.note.update({
    where: {
      id
    },
    data: {
      text: data.description
    }
  })

  return updated
}