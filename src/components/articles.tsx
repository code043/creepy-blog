"use client";
import { useLatestPosts } from "@/hooks/useLatestPosts";
import Image from "next/image";
import Link from "next/link";

export default function Articles() {
  const { posts, loading } = useLatestPosts();
 
  return (
    <div>
      <Link href={"/articles"}>
        <h1 className="mx-auto mb-10 text-center text-4xl text-blue-100 hover:underline font-creepster">
          Posts
        </h1>
      </Link>
      {loading && <div className="min-h-10 flex items-center justify-center bg-black">
        <h2 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
          Carregando...
        </h2>
      </div>}
      <div className="mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {!loading && posts.map((post) => {
            return (
              <li key={post.id} className="flex flex-col">
                <div className="overflow-hidden h-50 relative w-full">
                  {post.image && (
                    <Link href={"/post/" + post.slug}>
                      <Image
                        src={post.image}
                        width={300}
                        height={200}
                        alt="image"
                        className="object-cover w-full h-full block"
                      />
                    </Link>
                  )}
                </div>

                <Link href={"/post/" + post.slug}>
                  <p className="text-center w-full max-w-md px-3 py-4 text-[#526070] hover:text-white hover:underline break-words whitespace-normal">
                    {post.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
