"use client"

import { Suspense, useEffect, useState } from "react";
import Feed from "./Feed";
import PostForm from "./PostForm";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Post } from "@/app/types/Post";
import axios from "axios";
import InstaBox from "./InstaBox";
import Client from "@/app/types/Client";

function usePosts(slug: string) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [client, setClient] = useState<Client>();
    const [total, setTotal] = useState(0);
    const [editMode, setEditMode] = useState(false)
    const [postToEdit, setPostToEdit] = useState(null);
    const router= useRouter()

    useEffect(() => {
        
        async function fetchPosts() {
    
          const { data } = await axios.get(`/api/posts/${slug}/`);
          const resPosts= data.data
          setPosts(resPosts)
          setLoading(false);
        }
        async function fetchClient() {
    
          const { data } = await axios.get(`/api/client/${slug}/`);
          const res= data.data
          setClient(res)
        }
        fetchPosts()
        fetchClient()
      }, [slug, total]);


    function onPost(id: string){
      setTotal(total-1)
      setEditMode(false)
      if (id){
        router.push(`/admin/${slug}/posts?id=${id}`)
      } else {
        router.push(`/admin/${slug}/posts`)
      }
      
    }

    function onAdd(){
      setPostToEdit(null)
      setEditMode(true)
      if (editMode)
        router.push(`/admin/${slug}/posts`)
    }

    async function onEdit(id: string) {
      const { data }= await axios.get(`/api/posts/${slug}/${id}`)
      setPostToEdit(data.data)
      setEditMode(true)
    }

    function onFeedSelected() {
      setEditMode(false)
    }
   
    return { loading, posts, onPost, onAdd, editMode, setEditMode, total, setTotal, onFeedSelected, onEdit, postToEdit, client }
  }
  
export default function PostsPage({ params }: { params: { slug: string } }) {

  const { slug }= params

  const { loading, posts, onPost, onAdd, editMode, setEditMode, total, setTotal, onFeedSelected, onEdit, postToEdit, client }= usePosts(slug)  
  const searchParams= useSearchParams()
  if (!searchParams) return <div></div>

  
  const idPost= searchParams.get("id")
  const edit= searchParams.get("edit")
  
  if (!editMode && edit !== null && idPost){
    console.log("Editing...");
    
    onEdit(idPost)
  } 

  if (loading) 
    return <LoadingSpinner />


  return (
    <>
      <main className="md:flex">
        
        
        <Feed posts={posts} onAdd={onAdd} onFeedSelected={onFeedSelected}/>


        <div className="flex-grow">            

            {!editMode && idPost && client && <InstaBox postId={idPost} client={client} onDelete={() => setTotal(total-1)} onEdit={onEdit}/>}
            
            {editMode && postToEdit && client && <PostForm onPost={onPost} postToEdit={postToEdit} client={client} />}

            {editMode && !postToEdit && client && <PostForm onPost={onPost} client={client} />}
            
        </div>
      </main>
    </>
  );
}
