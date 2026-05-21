export default function AboutPage() {
  return (
    <section className="flex justify-center py-10">
      <div className="p-20 w-200 min-h-100 hyphens-auto font-sans text-gray-100">
        <h1 className="text-4xl font-bold pb-8 text-center">Sobre o Projeto</h1>

        <p className="text-center md:text-3xl text-gray-400">
          Este projeto reúne histórias de mistério, relatos da internet e
          narrativas inspiradas em eventos inexplicáveis.
        </p>

        <p className="text-center md:text-3xl text-gray-400">
          O objetivo é explorar o desconhecido não necessariamente explicá-lo.
        </p>

        <p className="text-center md:text-3xl text-gray-400">Todo conteúdo deve ser interpretado com senso crítico.</p>
      </div>
    </section>
  );
}
