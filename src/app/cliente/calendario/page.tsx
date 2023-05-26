
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import { getPostsBySlug } from "@/app/(server-side)/services/postServices";
import CalendarRC from "@/app/admin/[slug]/calendar/CalendarRC";
import { Post } from "@/app/types/Post";

export default async function CalendarPage() {
  const currentUser= await getCurrentUser()
  const client= currentUser?.client
  if (!client)
    return <div>Client not found</div>

  const posts = await getPostsBySlug(client.slug);

  console.log("-posts: " + posts.length);
  console.log("-client.slug: " + client.slug);
  
  const eventos = posts
    .filter((post): post is Post & { date: Date } & typeof post => post.date !== null)
    .map((post) => {
      let dateCopy = new Date(post.date);
      dateCopy.setDate(dateCopy.getDate()+1);

      return {
        title: post.title,
        content: post.copy || "",
        start: dateCopy,
        end: dateCopy,
        image: post.image || "",
        color: post.pilar.color,
        href: `/admin/tinta/posts?id=${post.id}&edit` ,
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

