import { DataReportDefinition } from "@/app/config/reports/(crud)/actions";
import { ReportDefinitionFormValues } from "@/app/config/reports/(crud)/report-definition-form";
import { prisma } from "../app/(server-side)/db";
import getIndicators from "./indicatorService";

export default async function getReportDefinitions(): Promise<DataReportDefinition[]> {

  const indicators= await getIndicators()
  const res: DataReportDefinition[]= []

  const found = await prisma.reportDefinition.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      indicators: {
        orderBy: {
          name: 'asc',
        },
      },
    },
  })

  found.forEach(reportdefinition => {
    res.push({
      id: reportdefinition.id,
      name: reportdefinition.name,
      description: reportdefinition.description,
      indicators: reportdefinition.indicators.map(indicator => ({
        id: indicator.id,
        name: indicator.name,
        description: indicator.description,
        type: indicator.type,
        icon: indicator.icon,
        order: indicator.order
      })),
      complementIndicators: indicators.filter(indicator => !reportdefinition.indicators.find(i => i.id === indicator.id))
    })
  })

  return res
}



export async function getReportDefinition(id: string) {

  const found = await prisma.reportDefinition.findUnique({
    where: {
      id
    },
    include: {
      indicators: {
        orderBy: {
          name: 'asc',
        },
      },
    },
  })

  return found
}

export async function createReportDefinition(data: ReportDefinitionFormValues) {
  
  const created= await prisma.reportDefinition.create({
    data
  })

  return created
}

export async function editReportDefinition(id: string, data: ReportDefinitionFormValues) {
  console.log(data);
  
  const edited= await prisma.reportDefinition.update({
    where: {
      id
    },
    data: {
      ...data,
    }
  })

  return edited
}

export async function deleteReportDefinition(id: string) {
  
  const deleted= await prisma.reportDefinition.delete({
    where: {
      id
    },
  })

  return deleted
}

export async function addIndicatorToReportDefinition(reportdefinitionId: string, indicatorId: string) {
  
  const added= await prisma.reportDefinition.update({
    where: {
      id: reportdefinitionId
    },
    data: {
      indicators: {
        connect: {
          id: indicatorId
        }
      }
    }
  })

  return added
}

export async function removeIndicatorFromReportDefinition(reportdefinitionId: string, indicatorId: string) {
    
    const removed= await prisma.reportDefinition.update({
      where: {
        id: reportdefinitionId
      },
      data: {
        indicators: {
          disconnect: {
            id: indicatorId
          }
        }
      }
    })
  
    return removed
}


export async function setReportToClient(clientId: number, reportdefinitionId: string) {
    
  const set= await prisma.client.update({
    where: {
      id: clientId
    },
    data: {
      reportDefinition: {
        connect: {
          id: reportdefinitionId
        }
      }
    }
  })

  return set
}