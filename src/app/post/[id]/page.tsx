import Article from "@/components/article";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  return (
    <section className="bg-black h-full">
      <Article id={id} />
    </section>
  );
}
