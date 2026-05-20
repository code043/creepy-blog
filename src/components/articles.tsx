"use client";
import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: 1,
    image: "/mapinguari.jpg",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    image: "/mokele.webp",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
];

export default function Articles() {
  return (
    <div>
      <h1 className="mx-auto mb-10 text-center text-2xl text-blue-100">Articles</h1>
      <div className="mx-auto flex justify-center md:flex-col">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10 w-87.5 md:w-150">
          {articles.map((art) => {
            return (
              <li key={art.id} className="flex flex-col  ">
                <div className="overflow-hidden h-50 relative w-full">
                  <Image
                    src={art.image}
                    width={300}
                    height={200}
                    alt="image"
                    className="object-cover h-full"
                  />
                </div>
                <Link href={"/"}>
                  <p className="text-center px-3 py-4 text-[#526070]">{art.text}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
