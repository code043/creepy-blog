"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/auth-content";
import { formatDate } from "@/utils/format";
import { usePaginationSearch } from "@/hooks/posts/usePaginationSearch";
import { useEffect, useRef } from "react";

export default function Dashboard() {
  const { user } = useAuth();
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
    <>
      <h1 className="mx-auto text-center pb-10 font-sans">
        Bem-vindo: <span className="text-blue-500">{user?.username}</span>
      </h1>
      <div className="flex justify-center mb-10">
        <input
          className=" border hover:border-blue-500 text-gray-400 outline-0 w-60 h-10 text-[15px] indent-1 rounded-md"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* INITIAL LOADING */}
      {loadingInitial && !loadingSearch && (
        <div className="h-50">
          <h2 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
            Carregando todos os posts...
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
      <div ref={articlesRef} className="flex justify-center px-4">
        <ul className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loadingSearch &&
            posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-col gap-4 rounded-lg shadow-sm p-5 w-full bg-[#060309]"
              >
                <h2 className="text-lg font-bold tracking-tight text font-body">
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

                <div className="max-w-md overflow-hidden">
                  <p className="text-base leading-relaxed font-body break-words whitespace-normal">
                    {post.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <Link
                    href={`/dashboard/post/${post.id}`}
                    className="bg-[#424e5a] text-white px-4 py-1  text-sm font-medium font-body"
                  >
                    Ver post
                  </Link>

                  <span className="text-sm font-body">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 border text-white disabled:opacity-30  hover:text-white cursor-pointer"
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
    </>
  );
}
