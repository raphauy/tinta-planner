"use client"

import CalendarRC from "./CalendarRC"
import { useEffect, useState } from "react"
import { Post } from "@/app/types/Post"
import LoadingSpinner from "@/components/LoadingSpinner"
import axios from "axios"
import { DataFechaImportante, getClientAndGlobalFechaImportantesBySlug, getClientIdBySlug } from "@/app/config/dates/(crud)/actions"
import { getClientAndGlobalFechaImportantes } from "@/services/fechaImportanteService"
import { Event } from "./CustomEvent"
import { format } from "date-fns"

function useCalendar(slug: string) {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [fechas, setFechas] = useState<DataFechaImportante[]>()

  useEffect(() => {
        
    async function fetchPosts() {
      const { data } = await axios.get(`/api/posts/${slug}/`);
      const resPosts= data.data
      setPosts(resPosts)
      setLoading(false);
    }
    fetchPosts()

    getClientAndGlobalFechaImportantesBySlug(slug).then((fechas) => {
      setFechas(fechas)
    })
    
  }, [slug]);

  return { loading, posts, fechas }
}

export default function CalendarPage({ params }: { params: { slug: string } }) {

  const { slug }= params
  const { loading, posts, fechas }= useCalendar(slug)

  if (loading) return <LoadingSpinner />
  
  const eventos = posts
    .filter((post): post is { date: Date } & typeof post => post.date !== null)
    .map((post) => {
      let dateCopy = new Date(post.date)
      dateCopy.setDate(dateCopy.getDate())

      return {
        title: post.title,
        content: post.copy || "",
        start: dateCopy,
        end: dateCopy,
        image: post.image || "",
        color: post.pilar.color,
        href: `/agency/${slug}/social/posts?id=${post.id}`,
        fechaImportante: "",
      }
    })

    const eventosDeFechasSinPost: Event[]= []

    fechas?.forEach((fecha) => {
      const fechaImportanteTitle= fecha.titulo

      const evento= eventos.find(evento => format(evento.start, "yyyy-MM-dd") === format(fecha.fecha, "yyyy-MM-dd"))
      if (evento) {
        if (evento.fechaImportante) 
          evento.fechaImportante= evento.fechaImportante + ", " + fechaImportanteTitle
        else evento.fechaImportante= fechaImportanteTitle
      } else {
        eventosDeFechasSinPost.push({
          title: "",
          content: "",
          start: fecha.fecha,
          end: fecha.fecha,
          image: "",
          color: "",
          href: "#",
          fechaImportante: fechaImportanteTitle,
        })
      }
    })

    // agregar los eventosDeFechasSinPost a los eventos pero al principio
    eventos.unshift(...eventosDeFechasSinPost)
  
  if (!slug) return <div>Slug not found</div>;

  return (
    <>
      <main className="flex flex-col w-full h-full gap-5 px-8 py-3 bg-gray-100">
        <div className="flex flex-col h-full p-3 bg-gray-200 border border-gray-300 rounded-xl">
          <CalendarRC events={eventos}></CalendarRC>
        </div>
      </main>
    </>
  );
}
