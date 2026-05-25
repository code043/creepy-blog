import CategoryPosts from "@/components/category-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
    
  return (
    <section className="flex justify-center px-4 py-20 bg-black ">
      <CategoryPosts slug={slug} />
    </section>
  );
}
