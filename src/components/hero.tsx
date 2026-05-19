import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div className="flex justify-center m-1">
        <Image
          src="/scary-monster-foggy-forest-night.jpg"
          alt="imagem"
          width={800}
          height={500}
        />
      </div>
      <h1 className="text-center text-4xl font-bold tracking-tight leading-tight mt-10 font-serif p-5">
        Nem tudo que é incerto deveria ser investigado. Algumas coisas são
        desconhecidas por uma razão.
      </h1>
    </>
  );
}
