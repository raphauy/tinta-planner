"use client"

import CalendarRC from "./CalendarRC";
import { useEffect, useState } from "react";
import { Post } from "@/app/types/Post";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";

function useCalendar(slug: string) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
        
    async function fetchPosts() {

      const { data } = await axios.get(`/api/posts/${slug}/`);
      const resPosts= data.data
      setPosts(resPosts)
      setLoading(false);
    }
    fetchPosts()
  }, [slug]);

  return { loading, posts }
}

export default function CalendarPage({ params }: { params: { slug: string } }) {

  const { slug }= params
  const { loading, posts }= useCalendar(slug)

  if (loading) return <LoadingSpinner />

  //const posts = await getPostsBySlug(slug);

  console.log("posts: " + posts.length);
  
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
        href: `/admin/${slug}/posts?id=${post.id}&edit` ,
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
