import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full">
      <Image
        src="/scary-monster-foggy-forest-night.jpg"
        alt="imagem"
        width={800}
        height={500}
        className="w-full h-auto block"
      />
      <h1 className="font-imfell text-center text-xl md:text-3xl font-bold mt-10 hyphens-auto text-gray-300 px-2">
        Nem tudo que é incerto deveria ser investigado. Algumas coisas são
        desconhecidas por uma razão.
      </h1>
    </div>
  );
}