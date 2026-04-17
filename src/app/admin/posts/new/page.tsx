import prisma from "@/lib/prisma";
import PostEditForm from "../[id]/edit/PostEditForm";

export default async function NewPostPage() {
  const users = await prisma.user.findMany();
  return <PostEditForm users={users} />;
}
