"use client"

import { DataReportDefinition, getDataReportDefinitions, setReportToClientAction } from "@/app/config/reports/(crud)/actions";
import Client from "@/app/types/Client";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useEffect, useState } from "react";
import ClientConfigForm from "./ClientConfigForm";

function useClientConfigPage(slug: string) {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Client>();
  const [total, setTotal] = useState(0)
  const [reports, setReports] = useState<DataReportDefinition[]>()

  useEffect(() => {
        
    async function fetch() {

      const { data } = await axios.get(`/api/client/${slug}/`);
      const resClient= data.data
      setClient(resClient)    

      const reports= await getDataReportDefinitions()
      setReports(reports)
      setLoading(false);
    }
    fetch()
    
  }, [slug, total]);

  function onChange() {
    setTotal(total+1)
  }

  return { loading, client, onChange, reports }
}

export default function ClientConfigPage({ params }: { params: { slug: string } }) {

  const { slug }= params

  const { loading, client, onChange, reports }= useClientConfigPage(slug)

  if (!client) return <LoadingSpinner />
  
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const reportDefinitionId= e.target.value
    console.log(reportDefinitionId)
    if (reportDefinitionId === "Seleccionar reporte") return

    async function setReport() {
      if (!client?.id) return

      await setReportToClientAction(client.id, reportDefinitionId)
    }
    setReport()

  }
    

  return (
    <div className="flex flex-col items-center">
      <section className="w-full text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-col w-full text-center mb-14">
            <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-4xl title-font">{client.name}</h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">{client.description}</p>
            <h2 className="mt-3 mb-4 text-2xl font-medium text-gray-900 sm:text-2xl title-font">Voz de marca:</h2>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">{client.brandVoice}</p>
          </div>
        </div>
      </section>
      <section className="w-full">
        <ClientConfigForm slug={slug} onChange={() => onChange()} />
      </section>
      <section className="flex items-center gap-2 mt-10">
        <p>Reporte:</p>
        <select onChange={handleChange} defaultValue={client.reportDefinitionId}>
          {!client.reportDefinitionId && <option key="1">Seleccionar reporte</option>}          
          {reports?.map((report) => (
            <option key={report.id} selected={client.reportDefinitionId === report.id} value={report.id}>{report.name}</option>
          ))}
        </select>
      </section>

    </div>
  );
}

