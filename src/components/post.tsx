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

  if (loading) return <p className="text-white">Loading...</p>;
  if (!post) return null;

  return (
    <div className="text-white bg-black px-6 md:px-10 overflow-x-hidden">
      <div className="flex flex-col items-center w-full">
        {/* CONTAINER PRINCIPAL */}
        <div className="w-full max-w-4xl">
          {/* ACTIONS (EDIT / DELETE) */}
          <div className="flex justify-center gap-10 py-8">
            <Link
              href={"/dashboard/edit/" + id}
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              Editar
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm font-medium text-red-400 hover:underline"
            >
              {deleting ? "..." : "Deletar"}
            </button>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 font-body">
            {post.title}
          </h1>

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
          <div className="mt-10">
            <h2 className="text-xl md:text-2xl px-2 font-body break-words whitespace-normal">
              {post.description}
            </h2>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-6 mt-6 px-2 font-body">
            {(post.content as ContentBlock[]).map((block: ContentBlock, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={i} className="text-base md:text-lg leading-relaxed">
                      {block.value}
                    </p>
                  );

                case "subtitle":
                  return (
                    <h2 key={i} className="text-2xl mt-8 font-bold">
                      {block.value}
                    </h2>
                  );

                case "image":
                  return (
                    <div
                      key={i}
                      className="relative w-full h-[300px] overflow-hidden rounded-md"
                    >
                      <Image
                        src={block.value}
                        alt="imagem"
                        fill
                        className="object-cover"
                      />
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>

          {/* FOOTER INFO */}
          <div className="flex justify-between items-center text-xs mt-10 px-2 text-gray-400 font-body">
            <p>{formatDate(post.createdAt)}</p>
            <p>{post.views} views</p>
          </div>

          {/* ACTIONS BOTTOM */}
          <div className="flex justify-center gap-10 py-10">
            <Link
              href={"/dashboard/edit/" + id}
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              Editar
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm font-medium text-red-400 hover:underline"
            >
              {deleting ? "..." : "Deletar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
