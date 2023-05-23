
import { headers } from "next/dist/client/components/headers";

import { getPostsBySlug } from "@/app/(server-side)/services/postServices";
import CalendarRC from "./CalendarRC";

export default async function CalendarPage() {

  const slug = getSlug();

  const posts = await getPostsBySlug(slug);

  console.log("posts: " + posts);
  console.log("client.slug: " + slug);

  const eventos = posts
    .filter((post): post is { date: Date } & typeof post => post.date !== null)
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

  if (!slug) return <div>Slug not found</div>;

  return (
    <>
      <main className="flex flex-col h-full gap-5 px-8 py-3">
        <div className="flex flex-col h-full p-3 bg-gray-200 border border-gray-300 rounded-xl">
          <CalendarRC events={eventos}></CalendarRC>
        </div>
      </main>
    </>
  );
}

function getSlug() {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const segments = header_url.split("/");
  const reversedSegments = segments.reverse();
  const slug = reversedSegments[1];
  return slug;
}
