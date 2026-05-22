"use client";

import { useDeletePost } from "@/hooks/useDeletePost";
import { useOnePost } from "@/hooks/useOnePost";
import { ContentBlock } from "@/types/blocks";
import { formatDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Post({ id }: { id: string }) {
  const router = useRouter();
  const { post, loading } = useOnePost(id);
  const { deletePost, loading: deleting } = useDeletePost();

  async function handleDelete() {
    const ok = confirm("Are you sure?");
    if (!ok) return;

    await deletePost(id);
    router.push("/dashboard");
  }

  if (loading) return <p>Loading...</p>;
  if (!post) return null;
  return (
    <div className="text-white bg-black px-10">
      <div className="flex flex-col items-center font-sans">
        <div >
          <h1 className="max-w-200 text-5xl font-bold tracking-tight leading-tight mb-5">
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
           <div className="flex justify-between items-center text-2xl mt-10 px-3 text-gray-300">
            <p className="my-8 px-3">{formatDate(post.createdAt)}</p>
            <p>{post.views} views</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-8">
        <Link
          href={"/dashboard/edit/" + id}
          className="text-center cursor-pointer  text-sm font-medium  text-blue-500"
        >
          Edit post
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-center cursor-pointer text-sm font-medium text-red-400"
        >
          {deleting ? "..." : "Delete post"}
        </button>
      </div>
    </div>
  );
}
