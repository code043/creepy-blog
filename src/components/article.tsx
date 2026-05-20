"use client";
import { useOnePost } from "@/hooks/useOnePost";
import Image from "next/image";

export default function Article({ id }: { id: string }) {
  const { post, loading } = useOnePost(id);

  function setDate(d: string | undefined) {
    if (typeof d !== "string") return "error";
    const date = new Date(d);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  
  

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Not found</p>;
  return (
     <div className="text-white bg-black px-10">
          <div className="flex justify-center font-sans">
            <div>
              <h1 className=" text-4xl font-bold tracking-tight leading-tight mt-10 p-5">
                {post.title}
              </h1>
              {post.image && (
                <Image src={post?.image} alt="imagem" width={800} height={500} />
              )}
              <h2 className="text-2xl my-3">{post.description}</h2>
              <div className="flex justify-center max-w-200">
                <p className="p-1 mt-3 hyphens-auto">{post.content}</p>
              </div>
              <p className="my-8">{setDate(post.createdAt)}</p>
              
            </div>
          </div>
        </div>
    // <div className="flex justify-center text-white bg-black">
    //   <div className="">
    //     <h1 className=" text-4xl font-bold tracking-tight leading-tight mt-10 font-serif p-5">
    //       {post.title}
    //     </h1>
    //     <Image src={post?.image} alt="imagem" width={800} height={500} />
    //     <h2>{post.description}</h2>
    //     <p>{post.content}</p>
    //   </div>
    // </div>
  );
}
