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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente exercitationem maxime culpa, ex fugiat rem fuga. Accusamus dolores, ipsam laudantium, earum repellat nemo assumenda numquam sint exercitationem voluptatum reiciendis maiores!
      </h1>
      <p className="text-center leading-relaxed p-10">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>
    </>
  );
}
