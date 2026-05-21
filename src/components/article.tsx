"use client";
import { usePostBySlug } from "@/hooks/usePostBySlug";
import { ContentBlock } from "@/types/blocks";
import { formatDate } from "@/utils/format";
import Image from "next/image";

export default function Article({ slug }: { slug: string }) {
  const { post, loading } = usePostBySlug(slug);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Not found</p>;
  return (
    <div className="text-white bg-black px-10">
      <div className="flex flex-col items-center font-sans">
        <div className="">
          <h1 className="max-w-200 text-4xl font-bold tracking-tight leading-tight mt-30 mb-20">
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
          <div className="text-2xl mt-10 px-3">
            <h2 className="text-2xl mt-10 px-3">{post.description}</h2>
          </div>

          <div className="flex flex-col gap-4 max-w-200 px-3 mt-3">
            {(post.content as ContentBlock[]).map((block: ContentBlock, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <div key={i} className="flex justify-center max-w-200">
                      <p className="px-3 mt-3 indent hyphens-auto">
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
          <div className="text-2xl mt-10 px-3">
            <p className="my-8 px-3 mx-auto">{formatDate(post.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
