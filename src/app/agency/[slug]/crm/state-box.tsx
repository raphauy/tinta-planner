import { getClientById } from '@/app/(server-side)/services/getClients'
import { cn, getStatusColor } from '@/lib/utils'
import { filterClientLeadsByStatus, getTotalValue } from '@/services/leadService'
import { Card, Flex, Metric, ProgressBar, Text } from '@tremor/react'
import Link from 'next/link'
import { DataLead } from './leads/(crud)/actions'

interface Props{
    status: string
    clientId: number
    totalLeads: number
}
export default async function StateBox({ status, clientId, totalLeads }: Props) {

  const client= await getClientById(clientId)
  if (!client) return <div>Client not found</div>

  const leads= await filterClientLeadsByStatus(clientId, status)
  const leadsCount= leads.length
  const percent= totalLeads === 0 ? 0 : Math.round((leadsCount / totalLeads) * 100)

  const totalValue= await getTotalValue(client.id, status)

  const darkColor= getStatusColor(status)
  return (
    <div className="p-1 mb-4">
        <div className="flex gap-4">
          <Card className="mx-auto">
            <Flex className='justify-between felx'>
              <div className={cn("text-xl font-bold")} style={{ color: darkColor }}>{status}</div>
              <Text className='flex gap-1 font-bold'>
                <p>{totalValue.toLocaleString(undefined, {localeMatcher: 'best fit', style: 'decimal', useGrouping: true}).replace(/,/g, '.')}</p>
                <p>USD</p>
              </Text>
            </Flex>
            <Metric>{percent}%</Metric>
            <Flex className="mt-4">
              <Text>{leadsCount} leads</Text>
              <Text>{totalLeads}</Text>
            </Flex>
            <ProgressBar value={percent} className="mt-2" />
          </Card>
        </div>
        {leads.length > 0 &&
            listLeads(leads, client.slug)
        }
      
      </div>

  )
}

function listLeads(leads: DataLead[], slug: string) {
  return (
    <div className='mx-auto mt-2 border rounded-md bg-slate-100'>
      {
        leads.map((lead, index) => {
          const serviceEmoji= lead.serviceEmoji
          const color= index % 2 === 0 ? "" : "bg-white"
          return (
          <div key={index} className={cn("flex justify-between items-center gap-3 p-1", color)}>
            <Link href={`/agency/${slug}/crm/leads/${lead.id}`}>
              {lead.company}
            </Link>
            <p>{serviceEmoji}</p>
          </div>
        )})
      }
    </div>
  )
}