"use client";
import { usePostBySlug } from "@/hooks/usePostBySlug";
import Image from "next/image";

export default function Article({ slug }: { slug: string }) {
  const { post, loading } = usePostBySlug(slug);

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
      <div className="flex flex-col items-center font-sans">
        <div className="">
          <h1 className="max-w-200 text-4xl font-bold tracking-tight leading-tight mt-30 mb-20">
            {post.title}
          </h1>
          {post.image && (
            <Image src={post?.image} alt="imagem" width={800} height={500} />
          )}
         <h2 className="text-2xl mt-10 px-3">{post.description}</h2>
          <div className="flex justify-center max-w-200">
            <p className="px-3 mt-3 indent hyphens-auto">{post.content}</p>
          </div>
          <p className="my-8 px-3 mx-auto">{setDate(post.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
