import { Post } from "@prisma/client"

interface Props {
    promise: Promise<Post[]>
}
export default async function ClientPosts({ promise }: Props) {
  
  const posts= await promise
  console.log("posts size: " + posts.length);

  
  return (
    <div className="flex flex-col p-4 m-4 border">
      {posts.map((post) => (
        <article key={post.id}>
          <p className="text-2xl">{post.title}</p>
          <p className="text-xl">{post.copy}</p>
          <br />
        </article>
    ))}

    </div>
  )
}
