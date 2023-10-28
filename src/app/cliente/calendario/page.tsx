
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import { getPostsBySlug, getPostsWithDate } from "@/app/(server-side)/services/postServices";
import CalendarRC from "@/app/agency/[slug]/social/calendar/CalendarRC";
import { Event } from "@/app/agency/[slug]/social/calendar/CustomEvent";
import { getClientAndGlobalFechaImportantesBySlug } from "@/app/config/dates/(crud)/actions";
import { Pilar, Post } from "@prisma/client";
import { format } from "date-fns";

export default async function CalendarPage() {
  const currentUser= await getCurrentUser()
  const client= currentUser?.clients[0]
  if (!client)
    return <div>Client not found</div>

  const posts = await getPostsBySlug(client.slug);
  const fechas = await getClientAndGlobalFechaImportantesBySlug(client.slug)

  const eventos = posts
    .filter((post: Post): post is { date: Date } & typeof post => post.date !== null)
    .map((post) => {
      let dateCopy = new Date()
        if (post.date !== null) {
          dateCopy = new Date(post.date)
        }
      dateCopy.setDate(dateCopy.getDate());

      return {
        title: post.title,
        content: post.copy || "",
        start: dateCopy,
        end: dateCopy,
        image: post.image || "",
        color: post.pilar.color,
        href: `/cliente/posts?id=${post.id}&edit` ,
        fechaImportante: "",
        status: post.status
      };
    });

    const eventosDeFechasSinPost: Event[]= []

    fechas?.forEach((fecha) => {
      const fechaImportanteTitle= fecha.titulo

      const evento= eventos.find(evento => format(evento.start, "yyyy-MM-dd") === format(fecha.fecha, "yyyy-MM-dd"))
      if (evento) {
        evento.fechaImportante= fechaImportanteTitle
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
          status: ""
        })
      }
    })

    // agregar los eventosDeFechasSinPost a los eventos
    eventos.unshift(...eventosDeFechasSinPost)


  return (
    <>
      <main className="flex flex-col h-[750px] gap-5 px-8 py-3 max-w-7xl">
        <div className="flex flex-col h-full p-3 bg-gray-200 border border-gray-300 rounded-xl">
          <CalendarRC events={eventos}></CalendarRC>
        </div>
      </main>
    </>
  );
}

