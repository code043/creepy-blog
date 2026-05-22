"use client";
import { usePostBySlug } from "@/hooks/usePostBySlug";
import { ContentBlock } from "@/types/blocks";
import { formatDate } from "@/utils/format";
import { useEffect } from "react";
import Image from "next/image";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Article({ slug }: { slug: string }) {
  const { post, loading } = usePostBySlug(slug);

 useEffect(() => {
  if (!post) return;

  let active = true;

  const timer = setTimeout(() => {
    if (active) {
      fetch(`${baseURL}/api/posts/${slug}/view`, {
        method: "POST",
      });
    }
  }, 120000);

  const handleVisibility = () => {
    active = !document.hidden;
  };

  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, [post, slug]);
  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Not found</p>;
  return (
    <div className="text-white bg-black px-10">
      <div className="flex flex-col items-center">
        <div className="">
          <h1 className="max-w-200 text-5xl font-bold tracking-tight leading-tight mt-10 mb-5 font-body">
            {post.title}
          </h1>

          <div className="w-200 h-125 relative">
            {post.image && (
              <Image
                src={post.image}
                alt="imagem"
                fill
                className="object-cover object-top"
              />
            )}
          </div>
          <div className="text-2xl my-10 px-3">
            <h2 className="text-2xl px-3 max-w-200 wrap-break-word font-body">{post.description}</h2>
          </div>

          <div className="flex flex-col gap-4 max-w-200 px-3 mt-3">
            {(post.content as ContentBlock[]).map((block: ContentBlock, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <div key={i} className="flex justify-center max-w-200">
                      <p className="px-3 mb-3 indent hyphens-auto">
                        {block.value}
                      </p>
                    </div>
                  );

                case "subtitle":
                  return (
                    <h2 key={i} className="text-2xl mt-10 px-3">
                      {block.value}
                    </h2>
                  );

                case "image":
                  return (
                    <div key={i} className="mx-auto w-120 h-60 relative ">
                      <Image
                        src={block.value}
                        alt="imagem"
                        fill
                        className="object-contain"
                      />
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>
          <div className="flex justify-between items-center text-[10px] mt-10 px-3 text-gray-300 font-body">
            <p className="my-8 px-3">{formatDate(post.createdAt)}</p>
            <p>{post.views} views</p>
          </div>
        </div>
      </div>
    </div>
  );
}
