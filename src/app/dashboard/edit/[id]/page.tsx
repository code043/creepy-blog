import EditPost from "@/components/edit-post";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function page({ params }: Props) {
  const { id } = await params;
  return (
    <section className="flex justify-center">
      <EditPost id={id} />
    </section>
  );
}
