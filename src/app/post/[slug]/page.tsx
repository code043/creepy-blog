import Article from "@/components/article";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  return (
    <section className="flex justify-center py-20 bg-black">
      <Article slug={slug} />
    </section>
  );
}
