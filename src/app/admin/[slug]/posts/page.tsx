"use client"

import { useEffect, useState } from "react";
import Feed from "./Feed";
import PostForm from "./PostForm";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Post } from "@/app/types/Post";
import axios from "axios";
import InstaBox from "./InstaBox";

function usePosts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [total, setTotal] = useState(0);
    const [editMode, setEditMode] = useState(false)
    const router= useRouter()
    const params= useParams()
    const slug= params.slug
  
    useEffect(() => {
        
        async function fetchPosts() {
    
          const { data } = await axios.get(`/api/posts/${slug}/`);
          const resPosts= data.data
          setPosts(resPosts)
          setLoading(false);
        }
        fetchPosts();
    }, [slug, total]);

    function onPost(){
      setTotal(total-1)
      setEditMode(false)
      router.push(`/admin/${slug}/posts`)
    }

    function onAdd(){
      setEditMode(true)
      if (editMode)
        router.push(`/admin/${slug}/posts`)
    }

    function onFeedSelected() {
      setEditMode(false)
    }
   
    return { loading, posts, onPost, onAdd, editMode, setEditMode, total, setTotal, onFeedSelected}
  }
  
export default function PostsPage() {
  const { loading, posts, onPost, onAdd, editMode, setEditMode, total, setTotal, onFeedSelected }= usePosts()  
  const searchParams= useSearchParams()
  const idPost= searchParams.get("id")

  if (loading) 
    return <LoadingSpinner />


  return (
    <>
      <main className="md:flex">
        
        <Feed posts={posts} onAdd={onAdd} onFeedSelected={onFeedSelected}/>

        <div className="flex-grow">            

            {!editMode && idPost && <InstaBox postId={idPost} onDelete={() => setTotal(total-1)} />}
            
            {editMode && <PostForm onPost={onPost} />}
            
        </div>
      </main>
    </>
  );
}
