import PostDetailDialog from "@/components/Dialogs/Post";

export default async function Modal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PostDetailDialog id={id} />;
}
