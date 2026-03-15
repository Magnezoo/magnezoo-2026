/*
  Warnings:

  - The primary key for the `vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tags_posts" DROP CONSTRAINT "tags_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "vote" DROP CONSTRAINT "vote_post_id_fkey";

-- DropForeignKey
ALTER TABLE "vote" DROP CONSTRAINT "vote_user_id_fkey";

-- AlterTable
ALTER TABLE "vote" DROP CONSTRAINT "vote_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "vote_pkey" PRIMARY KEY ("user_id", "post_id");

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "IconType";

-- AddForeignKey
ALTER TABLE "tags_posts" ADD CONSTRAINT "tags_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
