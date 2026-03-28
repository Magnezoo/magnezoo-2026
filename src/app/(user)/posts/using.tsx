import { Grid } from "@mui/material";
import { headers } from "next/headers";
import { use } from "react";
import PostCard from "@/components/Cards/PostCard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default function ResolvedPostsPage() {
  const allPosts = use(
    prisma.post.findMany({
      include: {
        author: {
          include: {
            slacks: {
              select: { name: true, isDisplayname: true },
            },
          },
        },
        votes: {
          select: { userId: true },
        },
      },
    }),
  );
  const headerStore = use(headers());
  const currentUser = use(auth.api.getSession({ headers: headerStore }))?.user;
  return (
    <Grid container spacing={2} justifyContent="center">
      {allPosts.map((post, index) => (
        <PostCard
          post={post}
          key={post.id}
          index={index}
          currentUserId={currentUser?.id || null}
        />
      ))}
    </Grid>
  );
}
