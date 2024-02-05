import { formatter } from "@/app/(client-side)/utils";
import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSummary } from "@/services/envio-services";
import { getClientActiveLeads } from "@/services/leadService";
import { Send } from "lucide-react";
import { Contact } from "lucide-react";
import { MailCheck } from "lucide-react";
import { Newspaper, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function DashboardPage({ params }: { params: { slug: string } }) {

  const { slug }= params  

  const client = await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>

  const summary= await getSummary(client.id)


  return (
    <div className="flex flex-col">
      <p className="mt-10 mb-5 text-3xl font-bold text-center">Dashboard</p>
      <div className="grid max-w-xl grid-cols-1 gap-10 sm:grid-cols-2">
        <Link href={`/agency/${slug}/newsletter/newsletters`}>
          <Card className="w-64">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Newsletters</CardTitle>
              <Newspaper className="text-gray-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.newsletterCount}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/agency/${slug}/newsletter/envios`}>
          <Card className="w-64">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Envíos</CardTitle>
              <Send className="text-gray-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.enviosCount}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/agency/${slug}/newsletter/emails`}>
          <Card className="w-64">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Emails enviados</CardTitle>
              <MailCheck className="text-gray-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.emailCount}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/agency/${slug}/newsletter/contacts`}>
          <Card className="w-64">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Contactos</CardTitle>
              <Contact className="text-gray-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.contactCount}</div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
