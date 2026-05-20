import Article from "@/components/article";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  return (
    <section className="flex justify-center py-20 bg-black">
      <Article id={id} />
    </section>
  );
}
