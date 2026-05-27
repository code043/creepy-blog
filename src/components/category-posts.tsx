"use client";

import { useCategoryPostsBySlug } from "@/hooks/categories/useCategoryPostsBySlug";
import { ContentBlock } from "@/types/post";
import { formatDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

function getContentPreview(content: unknown, maxLength = 100): string {
  if (typeof content === "string") return content.substring(0, maxLength);
  if (Array.isArray(content)) {
    const text = (content as ContentBlock[])
      .filter((b) => b.type === "paragraph" || b.type === "subtitle")
      .map((b) => b.value)
      .join(" ");
    return text.substring(0, maxLength);
  }
  return "";
}

export default function CategoryPosts({ slug }: { slug: string }) {
  const {
    posts,
    page,
    lastPage,
    search,
    setSearch,
    nextPage,
    prevPage,
    loadingInitial,
    loadingSearch,
  } = useCategoryPostsBySlug(slug);
  return (
    <section className="bg-black py-10">
      <div className="flex justify-center my-8">
        <input
          autoFocus
          className=" border hover:border-blue-500 text-gray-400 outline-0 w-60 h-10 text-[15px] indent-1 rounded-md"
          placeholder="Buscar posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* INITIAL LOADING */}
      {loadingInitial && !loadingSearch && (
        <div className="h-50">
          <h2 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
            Carregando...
          </h2>
        </div>
      )}
      {/* SEARCH */}
      {loadingSearch && (
        <div className="h-50">
          <h2 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
            Buscando...
          </h2>
        </div>
      )}
      {/* NO RESULTS */}
      {posts.length === 0 && !loadingSearch && !loadingInitial && (
        <div className="h-50">
          <h2 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
            We couldn’t find any results.
          </h2>
        </div>
      )}
      <div className="max-w-5xl mx-auto w-full">
        <ul className="space-y-6">
          {!loadingSearch &&
            posts.map((post) => (
              <li key={post.id} className="p-2 bg-[#060309] font-body">
                <div className="flex flex-col md:flex-row">
                  {post.image && (
                    <div className="w-full md:w-1/2 h-60">
                      <Link href={`/post/${post.slug}`}>
                        <Image
                          src={post.image}
                          width={400}
                          height={200}
                          alt="image"
                          className="object-cover w-full h-full"
                        />
                      </Link>
                    </div>
                  )}
                  <div className="w-full md:w-1/2 p-3 flex flex-col text-black bg-white min-h-full">
                    <Link
                      href={`/post/${post.slug}`}
                      className="hover:underline hover:text-blue-400"
                    >
                      <h1 className=" max-w-200 wrap-break-word font-bold mb-2 text-2xl">
                        {post.title}
                      </h1>
                    </Link>
                    <h2 className=" max-w-200 wrap-break-word font-medium mb-2">
                      {post.description}
                    </h2>
                    <p className="mb-4 text-gray-700">
                      {getContentPreview(post.content)}...
                      <Link
                        href={`/post/${post.slug}`}
                        className="text-blue-400 ml-2 hover:underline"
                      >
                        ver post
                      </Link>
                    </p>
                    <div className="mt-auto flex justify-between text-gray-700 text-[10px]">
                      <p >{formatDate(post.createdAt)}</p>
                      <p >{post.views} {post.views <= 1 ? 'view' : 'views'}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 border text-white disabled:opacity-30 hover:text-white cursor-pointer"
        >
          ← Anterior
        </button>

        <span className="text-white font-body my-auto">
          Página {page} de {lastPage}
        </span>

        <button
          onClick={nextPage}
          disabled={page === lastPage}
          className="px-4 py-2 border text-white disabled:opacity-30 hover:text-white cursor-pointer"
        >
          Próxima →
        </button>
      </div>
    </section>
  );
}
