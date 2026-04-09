import PostDetailDialog from "@/components/Dialogs/PostDetail";

export default async function Modal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PostDetailDialog type="id" id={id} />;
}
