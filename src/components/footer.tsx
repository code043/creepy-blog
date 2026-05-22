import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="flex justify-center w-full h-125 bg-[#060309] text-[#f5b461]">
        <div className=" px-10 w-125 flex justify-end items-center flex-col">
          <Link href={"/"}>
            <h1 className="text-center text-4xl font-creepster">Creepy</h1>
          </Link>
          <p className="text-center w-200 mt-8 text-[15px] font-body">
            O Creepy Archive é uma coleção continuamente atualizada de relatos
            inexplicáveis, registos fragmentados e testemunhos pessoais
            frequentemente sem origem verificada. Parte do material provém de
            fontes públicas, outra é enviada de forma anónima. Inclui menções a
            fenómenos associados à ufologia e à criptozoologia, como
            avistamentos não confirmados e criaturas não catalogadas. Alguns
            conteúdos podem parecer incompletos, inconsistentes ou
            deliberadamente ocultados. Não garantimos a precisão de todos os
            registos. Certos ficheiros contêm contradições ou detalhes que não
            podem ser verificados por meios convencionais. Se identificar
            padrões, locais ou descrições familiares, recomenda-se não
            investigar mais a fundo. Todas as interações com este sistema são
            registadas, embora nem todos os registos permaneçam acessíveis. Há
            coisas que é melhor não confirmar.
          </p>
          <div>
            <ul className="flex justify-center gap-2 mt-10 font-creepster">
              <li className="underline m-2">Instagram</li>
              <li className="underline m-2">Tiktok</li>
              <li className="underline m-2">YouTube</li>
            </ul>
            <div className="text-center my-10 w-100 font-sans">
              © 2026 Creepy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
