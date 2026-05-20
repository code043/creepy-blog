import Post from "@/components/post";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="flex justify-center py-20 bg-black">
      <Post id={id} />
    </div>
  );
}
