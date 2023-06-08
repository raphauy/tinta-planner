
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import { getPostsBySlug, getPostsWithDate } from "@/app/(server-side)/services/postServices";
import CalendarRC from "@/app/admin/[slug]/calendar/CalendarRC";
import { Pilar, Post } from "@prisma/client";

export default async function CalendarPage() {
  const currentUser= await getCurrentUser()
  const client= currentUser?.client
  if (!client)
    return <div>Client not found</div>

  const posts = await getPostsBySlug(client.slug);

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
      };
    });

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

