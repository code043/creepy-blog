import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#060309] text-[#f5b461]">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">

        <Link href={"/"}>
          <h1 className="text-center text-4xl font-creepster">Creepy</h1>
        </Link>

        <p className="text-center max-w-2xl mt-8 text-[15px] font-body">
          O Creepy é uma coleção continuamente atualizada de relatos
          inexplicáveis, registos fragmentados e testemunhos pessoais
          frequentemente sem origem verificada...
        </p>

        <ul className="flex justify-center gap-4 mt-10 font-creepster">
          <li className="underline">Instagram</li>
          <li className="underline">Tiktok</li>
          <li className="underline">YouTube</li>
        </ul>

        <div className="text-center my-10 text-sm font-sans">
          © 2026 Creepy. All rights reserved.
        </div>

      </div>
    </footer>
  );
}