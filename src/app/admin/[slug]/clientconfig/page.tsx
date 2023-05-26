"use client"

import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import LoadingSpinner from "@/components/LoadingSpinner";
import ClientConfigForm from "./ClientConfigForm";
import { useEffect, useState } from "react";
import Client from "@/app/types/Client";
import axios from "axios";

function useClientConfigPage(slug: string) {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Client>();
  const [total, setTotal] = useState(0)

  useEffect(() => {
        
    async function fetch() {

      const { data } = await axios.get(`/api/client/${slug}/`);
      const resClient= data.data
      setClient(resClient)
      setLoading(false);
    }
    fetch()
  }, [slug, total]);

  function onChange() {
    setTotal(total+1)
  }

  return { loading, client, onChange }
}

export default function ClientConfigPage({ params }: { params: { slug: string } }) {

  const { slug }= params

  const { loading, client, onChange }= useClientConfigPage(slug)

  if (!client) return <LoadingSpinner />

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-col w-full text-center mb-14">
            <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-4xl title-font">{client.name}</h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">{client.description}</p>
          </div>
        </div>
      </section>
      <section>
        <ClientConfigForm slug={slug} onChange={() => onChange()} />
      </section>
    </>
  );
}

