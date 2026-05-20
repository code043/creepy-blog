import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div className="flex justify-center m-1">
        <div className="w-200 mt-20">
          <Image
            src="/scary-monster-foggy-forest-night.jpg"
            alt="imagem"
            width={800}
            height={500}
          />

          <div className=" max-w-200">
            <h1 className="text-center md:text-3xl font-bold mt-10 hyphens-auto text-[#56687d]">
              Nem tudo que é incerto deveria ser investigado. Algumas coisas são
              desconhecidas por uma razão.
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
