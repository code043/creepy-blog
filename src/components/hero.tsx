import Image from "next/image";
import heroImg from "../../public/scary-monster-foggy-forest-night.jpg";

export default function Hero() {
  return (
    <div className="w-full m-10">
      <Image
        src={heroImg}
        alt="imagem"
        placeholder="blur"
        className="w-full h-auto block [mask-image:radial-gradient(ellipse_100%_60%_at_center,white_10%,transparent_80%)]"
        priority
      />

      <h1 className="font-imfell text-center text-xl md:text-3xl font-bold mt-10 hyphens-auto text-gray-300 px-2">
        Nem tudo que é incerto deveria ser investigado. Algumas coisas são
        desconhecidas por uma razão.
      </h1>
    </div>
  );
}
