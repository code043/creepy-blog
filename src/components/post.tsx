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
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-sm bg-[#060309] text-white w-125">
      <div className="">
        <h1 className=" text-4xl font-bold tracking-tight leading-tight mt-10 font-serif p-5">
          {post.title}
        </h1>
        <Image src={post?.image} alt="imagem" width={800} height={500} />
        <h2 className="text-2xl">{post.description}</h2>
        <p>{setDate(post?.createdAt)}</p>

        <div className="flex justify-between">
          <Link
            href={"/dashboard/edit/" + id}
            className="px-5 py-2 w-20 rounded-md bg-green-400"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-5 py-2 w-20 rounded-md bg-red-400"
          >
            {deleting ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
