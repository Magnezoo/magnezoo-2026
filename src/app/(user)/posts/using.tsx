import { Grid } from "@mui/material";
import { headers } from "next/headers";
import { use } from "react";
import PostCard from "@/components/Cards/PostCard";
import type { Post, Slacks, User } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default function ResolvedPostsPage() {
  // ランダムにソートしたいので$queryRawを使う
  const allPosts = use(
    prisma.$queryRaw`
SELECT
  p."id",
  p."title",
  p."description",
  p."imageUrl",
  p."createdAt",
  p."authorId",
  (
    SELECT json_build_object(
      'id', u."id",
      'name', u."name",
      'email', u."email",
      'image', u."image",
      'nickName', u."nickName",
      'slacks', COALESCE((SELECT json_agg(json_build_object('name', s."name", 'isDisplayname', s."isDisplayname")) FROM "slacks" s WHERE s."userId" = u."id"), '[]')
    )
  ) AS author,
  COALESCE((SELECT json_agg(json_build_object('userId', v.user_id)) FROM "vote" v WHERE v.post_id = p."id"), '[]') AS votes
FROM
  "post" p
JOIN
  "user" u ON p."authorId" = u."id"
ORDER BY
  RANDOM()`,
  ) as ({
    author: User & {
      slacks: Omit<Slacks, "userId" | "id" | "createdAt" | "updatedAt">[];
    };
    votes: { userId: string }[];
  } & Post)[];

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
