"use client";
import Image from "next/image";
import Link from "next/link";
import { usePaginationSearch } from "@/hooks/usePaginationSearch";

export default function AllArticlesPage() {
  const { posts, page, lastPage, search, setSearch, nextPage, prevPage } =
    usePaginationSearch();

  function setDate(d: string | undefined) {
    if (typeof d !== "string") return "error";
    const date = new Date(d);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  return (
    <section className="bg-black px-4 py-30">
      <div className="flex justify-center my-8">
        <input
          className=" border hover:border-blue-500 text-gray-400 outline-0 w-60 h-10 text-[15px] indent-1 rounded-md"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="max-w-5xl mx-auto w-full">
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="p-2 bg-[#060309] ">
              <div className="flex flex-col md:flex-row">
                {post.image && (
                  <div className="w-full md:w-1/2 h-60">
                    <Image
                      src={post.image}
                      width={400}
                      height={200}
                      alt="image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="w-full md:w-1/2 p-3 flex flex-col bg-white">
                  <h1 className="font-bold mb-2">{post.title}</h1>
                  <h2 className="font-semibold mb-2">{post.description}</h2>
                  <p className="mb-4">
                    {post.content.substring(0, 150)}...
                    <Link
                      href={`/post/${post.slug}`}
                      className="text-blue-400 ml-2 hover:underline"
                    >
                      ver post
                    </Link>
                  </p>
                  <span className="mt-auto">
                    published: {setDate(post.createdAt)}
                  </span>
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
          className="px-4 py-2 border text-white disabled:opacity-30 hover:bg-green-400 hover:text-white cursor-pointer"
        >
          ← Anterior
        </button>

        <span className="text-white">
          Página {page} de {lastPage}
        </span>

        <button
          onClick={nextPage}
          disabled={page === lastPage}
          className="px-4 py-2 border text-white disabled:opacity-30  hover:bg-green-400 hover:text-white cursor-pointer"
        >
          Próxima →
        </button>
      </div>
    </section>
  );
}
