"use client"

import { Post } from "@/app/types/Post";
import PostBox from "./PostBox";
import { GrAddCircle } from "react-icons/gr";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface FeedProps{
  posts: Post[]
  onAdd?: () => void
  onFeedSelected?: () => void
}

export default function Feed({ posts, onAdd, onFeedSelected }: FeedProps) {

  return (
    <div className="pt-2 border w-full h-fit rounded-xl border-gray-300 bg-gray-200 min-w-[380px] max-w-[500px] m-4">
      <div className="grid grid-cols-3">
        <p className="mb-2 text-center"></p>
        <p className="mb-2 text-center">Feed</p>
        {onAdd && <GrAddCircle onClick={() => onAdd()} className="mr-1 cursor-pointer justify-self-end" size={22}/>}
      </div>

      <div  className="grid grid-cols-3 gap-2 p-2 overflow-auto max-h-[320px] md:max-h-[800px]">
        {posts.map((post) => (
          <PostBox
            key={post.id}
            post={post}
            onSelected={onFeedSelected}
          />
        ))}
      </div>      


    </div>
  );
}
