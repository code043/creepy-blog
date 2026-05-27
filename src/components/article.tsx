"use client";

import { usePostBySlug } from "@/hooks/posts/usePostBySlug";
import { ContentBlock } from "@/types/blocks";
import { formatDate } from "@/utils/format";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h2 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
          Carregando...
        </h2>
      </div>
    );
  }
  if (!post) return <p className="text-white">Not found</p>;

  return (
    <div className="text-white bg-black px-6 md:px-10 overflow-x-hidden">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl font-body ">
          {/* TITLE */}
          <h1 className="text-xl md:text-5xl font-bold mt-10 mb-6">
            {post.title}
          </h1>
          {/* SECOND TITLE */}
          <div className="mt-3 md:mt-10 mb-5">
            <h2
              className="text-sm md:text-3xl  
	px-1 font-body break-words whitespace-normal text-gray-200"
            >
              {post.description}
            </h2>
          </div>

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

          {/* CONTENT */}
          <div className="flex flex-col gap-6 mt-5 px-2 font-body">
            {(post.content as ContentBlock[]).map((block, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p
                      key={i}
                      className="text-gray-400 text-base md:text-lg leading-relaxed"
                    >
                      {block.value}
                    </p>
                  );

                case "subtitle":
                  return (
                    <h2
                      key={i}
                      className="text-xl md:text-2xl mt-3 font-body text-gray-200"
                    >
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
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>
          {/* CATEGORY */}
          <div className="mt-5">
            {post.category && (
              <span className="text-[15px] md:text-[15px] px-2 font-body text-blue-700 hover:underline">
                <Link href={"/categories/" + post.category.slug}>
                  {post.category.name}
                </Link>
              </span>
            )}
          </div>
          {/* FOOTER INFO */}
          <div className="flex justify-between items-center text-xs mt-25 px-2 text-gray-400 font-body">
            <p>{formatDate(post.createdAt)}</p>
            <p>{post.views} {post.views <= 1 ? 'view' : 'views'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
