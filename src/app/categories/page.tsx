"use client";
import { useCategories } from "@/hooks/categories/useCategories";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const { categories, loading } = useCategories();
  console.log(categories)
  return (
    <section className="bg-black px-4 py-30">
      <div className="flex justify-center my-8">
        <h1 className="text-4xl">Categorias</h1>
      </div>
      {loading && (
        <div className="min-h-90 flex items-center justify-center bg-black">
          <h2 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
            Carregando...
          </h2>
        </div>
      )}

      <div className="max-w-5xl mx-auto w-full">
        <ul className="space-y-6">
          {categories.map((ct) => {
            return (
              <li key={ct.id} className="p-2 bg-[#060309] font-body">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 h-60">
                    <Link
                      href={"/categories/" + ct.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={ct.image}
                        width={400}
                        height={200}
                        alt="image"
                        className="object-cover w-full h-full"
                      />
                    </Link>
                  </div>

                  <div className="w-full md:w-1/2 p-3 flex flex-col text-black bg-white min-h-full">
                    <h1 className=" max-w-200 wrap-break-word font-bold mb-2 text-2xl">
                      {ct.name}
                    </h1>
                    <p className=" max-w-200 text-[15px] text-gray-700  wrap-break-word mb-2">
                      {ct.description}
                    </p>

                    <div className="mt-auto flex justify-between text-gray-700 text-[10px]">
                      <p className=" text-gray-700">
                        <Link
                          href={"/categories/" + ct.slug}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 text-[15px] ml-2 hover:underline"
                        >
                          {ct._count.posts} posts
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
    
  );
}
