"use client"

import Feed from "@/app/agency/[slug]/social/posts/Feed";
import InstaBox from "@/app/agency/[slug]/social/posts/InstaBox";
import Client from "@/app/types/Client";
import { Post } from "@/app/types/Post";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function usePosts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [client, setClient] = useState<Client>();
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
      async function fetchClient() {
        const { data } = await axios.get(`/api/client`);
        return data.data;
      }
    
      fetchClient()
      .then((res) => setClient(res))
      .catch(error => console.log(error))
      
    }, []);
    
    useEffect(() => {
      async function fetchPosts() {
        if (client) {
          const { data } = await axios.get(`/api/posts/${client.slug}/wdate`);
          const res = data.data;
          setPosts(res);
          setLoading(false);
        }
      }
    
      fetchPosts();
    }, [client, total]); 

   
    return { loading, posts, total, setTotal, client }
  }
  
export default function PostsPage() {
  const { loading, posts, total, setTotal, client }= usePosts()  
  const searchParams= useSearchParams()
  if (!searchParams)
    throw Error("useSearchParams() is not working")

  const idPost= searchParams.get("id")
  

  if (loading) 
    return <LoadingSpinner />


  return (
    <>
      <main className="flex justify-center">
        <div className="md:flex md:w-4/5">
      <Feed posts={posts} />        

        <div className="flex-grow">            

          {idPost && client && <InstaBox postId={idPost} client={client} onDelete={() => setTotal(total-1)} onPost={() => setTotal(total-1)}/>}
            
        </div>
        </div>
      </main>
    </>
  );
}
