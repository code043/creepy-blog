"use client";

import { useDeletePost } from "@/hooks/useDeletePost";
import { useOnePost } from "@/hooks/useOnePost";
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
  if (!post) return null;
  return (
    <div className=" text-white bg-black px-10">
      <div className="flex justify-center font-sans">
        <div className="bg-black min-h-screen" >
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
          <div className="flex justify-between py-8">
            <Link
              href={"/dashboard/edit/" + id}
              className="text-center cursor-pointer  text-sm font-medium  text-blue-500"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-center cursor-pointer text-sm font-medium text-red-400"
            >
              {deleting ? "..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
