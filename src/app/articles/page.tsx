"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePaginationSearch } from "@/hooks/posts/usePaginationSearch";
import { formatDate } from "@/utils/format";

type ContentBlock = {
  type: string;
  value: string;
};

function getContentPreview(content: unknown, maxLength = 100): string {
  if (typeof content === "string") return content.substring(0, maxLength);

  if (Array.isArray(content)) {
    const text = (content as ContentBlock[])
      .filter(
        (block) => block.type === "paragraph" || block.type === "subtitle",
      )
      .map((block) => block.value)
      .join(" ");

    return text.substring(0, maxLength);
  }

  return "";
}

export default function AllArticlesPage() {
  const {
    posts,
    page,
    lastPage,
    pages,
    setPage,
    search,
    setSearch,
    nextPage,
    prevPage,
    loadingInitial,
    loadingSearch,
  } = usePaginationSearch();

  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      articlesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [page]);

  return (
    <section className="bg-black px-4 py-30">
      <div className="flex justify-center my-8">
        <input
          autoFocus
          className="border hover:border-blue-500 text-gray-400 outline-0 w-60 h-10 text-[15px] indent-1 rounded-md"
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

      {/* SCROLL */}
      <div ref={articlesRef} className="max-w-5xl mx-auto w-full">
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
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </Link>
                    </div>
                  )}

                  <div className="w-full md:w-1/2 p-3 flex flex-col bg-white text-black">
                    <Link
                      href={`/post/${post.slug}`}
                      className="hover:text-blue-400 hover:underline"
                    >
                      <h1 className="font-bold text-2xl mb-2 break-words">
                        {post.title}
                      </h1>
                    </Link>

                    <h2 className="font-medium mb-2 break-words">
                      {post.description}
                    </h2>

                    <p className="mb-4 text-gray-700">
                      {getContentPreview(post.content)}...
                      <Link
                        href={`/post/${post.slug}`}
                        className="ml-2 text-sm text-blue-400 hover:underline"
                      >
                        ver post
                      </Link>
                    </p>

                    {post.category && (
                      <p className="mb-3 text-[#29dd35] hover:underline">
                        <Link href={`/categories/${post.category.slug}`}>
                          {post.category.name}
                        </Link>
                      </p>
                    )}

                    <div className="mt-auto flex justify-between text-[10px] text-gray-700">
                      <p>{formatDate(post.createdAt)}</p>

                      <p>
                        {post.views} {post.views === 1 ? "view" : "views"}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-4 py-2 border text-white cursor-pointer disabled:opacity-30"
          >
            ← Anterior
          </button>

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 border cursor-pointer font-body ${
                p === page ? "bg-white text-black" : "text-white"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={page === lastPage}
            className="px-4 py-2 border text-white cursor-pointer disabled:opacity-30"
          >
            Próxima →
          </button>
        </div>
      </div>
    </section>
  );
}
