-- DropForeignKey
ALTER TABLE "tags_posts" DROP CONSTRAINT "tags_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "tags_posts" DROP CONSTRAINT "tags_posts_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "vote" DROP CONSTRAINT "vote_post_id_fkey";

-- DropForeignKey
ALTER TABLE "vote" DROP CONSTRAINT "vote_user_id_fkey";

-- AddForeignKey
ALTER TABLE "tags_posts" ADD CONSTRAINT "tags_posts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_posts" ADD CONSTRAINT "tags_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
