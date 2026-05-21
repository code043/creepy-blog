"use client";
import { usePublicPosts } from "@/hooks/usePublicPosts";
import Image from "next/image";
import Link from "next/link";

export default function Articles() {
  const { posts } = usePublicPosts();
  return (
    <div>
      <h1 className="mx-auto mb-10 text-center text-2xl text-blue-100">
        Articles
      </h1>
      <div className="mx-auto flex justify-center md:flex-col">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 w-87.5 md:w-200">
          {posts.map((post) => {
            return (
              <li key={post.id} className="flex flex-col  ">
                <div className="overflow-hidden h-50 relative w-full">
                  {post.image && (
                    <Link href={"/post/" + post.slug}>
                      <Image
                        src={post.image}
                        width={300}
                        height={200}
                        alt="image"
                        className="object-cover h-full"
                      />
                    </Link>
                  )}
                </div>
                <Link href={"/"}>
                  <p className="text-center px-3 py-4 text-[#526070]">
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
