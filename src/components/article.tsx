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

  if (loading) return <p className="text-white">Loading...</p>;
  if (!post) return <p className="text-white">Not found</p>;

  return (
    <div className="text-white bg-black px-6 md:px-10 overflow-x-hidden">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl font-body ">
          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold mt-10 mb-6">Tittulo</h1>
          {/* HERO IMAGE */}
          <div className="relative w-full aspect-video overflow-hidden rounded-md">
            {post.image && (
              <Image
                src={post.image}
                alt="imagem"
                width={900}
                height={200}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* DESCRIPTION */}
          <h2 className="mt-8 text-xl md:text-2xl break-words leading-relaxed">
            description
          </h2>
          CONTENT
          <div className="flex flex-col gap-6 mt-8">
            {(post.content as ContentBlock[]).map((block, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={i} className="text-base md:text-lg leading-relaxed">
                      {block.value}
                    </p>
                  );

                case "subtitle":
                  return (
                    <h2 key={i} className="text-2xl font-bold mt-6">
                      {block.value}
                    </h2>
                  );

                case "image":
                  return (
                    <div key={i} className="w-full flex justify-center">
                      <div className="relative w-[350px] h-[250px] overflow-hidden">
                        <Image
                          src={block.value}
                          alt="image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>
          <div className="flex justify-between text-xs mt-10 text-gray-400">
            <p>{formatDate(post.createdAt)}</p>
            <p>{post.views} views</p>
          </div>
        </div>
      </div>
    </div>
  );
}
