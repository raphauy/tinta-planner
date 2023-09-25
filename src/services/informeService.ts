import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import { DataInforme } from "@/app/agency/[slug]/social/informes/gestionar/(crud)/actions";
import { InformeFormValues } from "@/app/agency/[slug]/social/informes/gestionar/(crud)/informe-form";
import { format } from "date-fns";
import { prisma } from "../app/(server-side)/db";
import { getReportDefinition } from "./reportDefinitionService";
import { es } from "date-fns/locale";

export default async function getInformes(): Promise<DataInforme[]> {


  const found = await prisma.informe.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      dataIndicators: {
        include: {
          indicator: true,
        }
      }
    },
  })

  const res: DataInforme[]= []
  found.forEach(informe => {
    res.push({
      id: informe.id,
      name: informe.name,
      month: informe.month,
      status: informe.status,
      notasFacebook: informe.notasFacebook,
      notasInstagram: informe.notasInstagram,
      notasLinkedin: informe.notasLinkedin,
      indicators: informe.dataIndicators.map(dataIndicator => {
        return {
          id: dataIndicator.id,
          name: dataIndicator.indicator.name,
          description: dataIndicator.indicator.description,
          type: dataIndicator.indicator.type,
          icon: dataIndicator.indicator.icon,
          previousValue: dataIndicator.previousValue,
          value: dataIndicator.value,
          indicatorId: dataIndicator.indicatorId
        }
      })
    })
  })

  return res
}


export async function getInformesOfClient(clientId: number): Promise<DataInforme[]> {


  const found = await prisma.informe.findMany({
    where: {
      clientId
    },
    orderBy: {
      month: 'desc',
    },
    include: {
      dataIndicators: {
        include: {
          indicator: true,
        },
        orderBy: {
          indicator: {
            type: 'asc',
          },
        }
      }
    },
  })

  const res: DataInforme[]= []
  found.forEach(informe => {
    res.push({
      id: informe.id,
      name: informe.name,
      month: informe.month,
      status: informe.status,
      notasFacebook: informe.notasFacebook,
      notasInstagram: informe.notasInstagram,
      notasLinkedin: informe.notasLinkedin,
      indicators: informe.dataIndicators.map(dataIndicator => {
        return {
          id: dataIndicator.id,
          name: dataIndicator.indicator.name,
          description: dataIndicator.indicator.description,
          type: dataIndicator.indicator.type,
          icon: dataIndicator.indicator.icon,
          previousValue: dataIndicator.previousValue,
          value: dataIndicator.value,
          indicatorId: dataIndicator.indicatorId
        }
      })
    })
  })
  // sort indicators by type in firs place and then by name
  res.forEach(informe => {
    informe.indicators.sort((a, b) => {
      if (a.type < b.type) return -1
      if (a.type > b.type) return 1
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  })

  return res
}



export async function getInforme(id: string) {
  if (!id) return null

  const found = await prisma.informe.findUnique({
    where: {
      id
    },
    include: {
      dataIndicators: {
        include: {
          indicator: true,          
      },
      orderBy: {
        indicator: {
          name: 'asc',
        },
      }
    },
  },
  })

  return found
}

export async function createInforme(slug: string, data: InformeFormValues) {

  const client= await getClientBySlug(slug)
  if(!client) return null
  
  const created= await prisma.informe.create({
    data: {
      ...data,
      client: {
        connect: {
          id: client.id
        }
      }
    }
  })

  if (!client.reportDefinitionId) return created

  const report= await getReportDefinition(client.reportDefinitionId)
  if (!report) return created

  const indicators= report.indicators
  for (let i = 0; i < indicators.length; i++) {
    const indicator = indicators[i];
    const previousValue= await getLastDataIndicatorValue(indicator.id, client.id, data.month)

    await prisma.dataIndicator.create({
      data: {
        indicator: {
          connect: {
            id: indicator.id
          }
        },
        informe: {
          connect: {
            id: created.id
          }
        },
        previousValue: previousValue || 0,
        value: 0,
        date: new Date(),
      }
    })
  }



  return created
}

export async function editInforme(id: string, data: InformeFormValues) {
  
  const edited= await prisma.informe.update({
    where: {
      id
    },
    data: {
      ...data,
    }
  })

  return edited
}

export async function deleteInforme(id: string) {
  
  const deleted= await prisma.informe.delete({
    where: {
      id
    },
  })

  return deleted
}

export async function updateDataIndicators(json: string) {
  const dataIndicators: {id: string, value: number}[]= []
  const parsed= JSON.parse(json)
  for (const key in parsed) {
    if (Object.prototype.hasOwnProperty.call(parsed, key)) {
      const value = parsed[key];
      dataIndicators.push({
        id: key,
        value: Number(value)
      })
    }
  }
  
  for (let i = 0; i < dataIndicators.length; i++) {
    const dataIndicator = dataIndicators[i];
    await prisma.dataIndicator.update({
      where: {
        id: dataIndicator.id
      },
      data: {
        value: dataIndicator.value,
      }
    })
  }

}

export async function getSelectorData(clientId: number) {
  let result: { id: string; name: string }[] = []

  const informes= await getInformesOfClient(clientId)

  const selectorData= informes.map(informe => ({ id: informe.id, name: informe.name }))
  
  result = result.concat(selectorData)
  
  return result;
}

export async function getPublishedSelectorData(clientId: number) {
  let result: { id: string; name: string }[] = []

  const informes= await getInformesOfClient(clientId)

  // filter only published informes
  const published= informes.filter(informe => informe.status === 'published')

  const selectorData= published.map(informe => ({ id: informe.id, name: informe.name }))
  
  result = result.concat(selectorData)
  
  return result;
}


export async function getLastDataIndicatorValue(indicatorId: string, clientId: number, month: Date) {
  const dataIndicator= await prisma.dataIndicator.findFirst({
    where: {
      indicatorId,
      informe: {
        clientId,
        month: {
          lt: month,
        }
      }
    },
    orderBy: {
      informe: {
        month: 'desc',
      }
    },
  })

  return dataIndicator?.value
}


export type DataToGraph= {
  name: string,
  valor: number,
}

export async function getDataToGraph(indicatorId: string, clientId: number) {
  
  const dataIndicators= await prisma.dataIndicator.findMany({
    where: {
      indicatorId,
      informe: {
        clientId,
      }
    },
    include: {
      informe: true,
    },
    orderBy: {
      informe: {
        month: 'asc',
      }
    },
    take: 12,
  })
  const result: DataToGraph[]= []
  dataIndicators.forEach(dataIndicator => {
    result.push({
      name: format(dataIndicator.informe.month, 'MMM', { locale: es }),
      valor: dataIndicator.value,
    })
  })

  return result
}

export async function changeStatus(id: string, status: string) {
  const informe= await prisma.informe.update({
    where: {
      id
    },
    data: {
      status
    }
  })

  return informe
}