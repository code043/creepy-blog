"use client";
import { usePosts } from "@/hooks/usePosts";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const { posts, loading } = usePosts();

  function setDate(d: string) {
    const date = new Date(d);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  if (loading || !posts) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex justify-center px-4">
      <ul className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-4 rounded-lg shadow-sm p-5 w-full bg-[#060309] border border-[#f5b461]"
          >
            <h2 className="text-lg font-bold tracking-tight text">
              {post.title}
            </h2>

            {post.image && (
              <div className="relative w-full aspect-video overflow-hidden rounded-md">
                <Image
                  src={post.image}
                  alt="image"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="text-base leading-relaxed">
              {post.description}
            </p>

            <div className="flex justify-between items-center mt-auto">
              <Link
                href={`/dashboard/post/${post.id}`}
                className="bg-[#424e5a] text-white px-4 py-1  text-sm font-medium"
              >
                See post
              </Link>

              <span className="text-sm">
                {setDate(post.createdAt)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}