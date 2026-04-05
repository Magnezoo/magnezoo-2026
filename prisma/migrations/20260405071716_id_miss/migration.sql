/*
  Warnings:

  - The primary key for the `vote` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "vote" DROP CONSTRAINT "vote_pkey",
ADD CONSTRAINT "vote_pkey" PRIMARY KEY ("user_id", "post_id", "isSalesApplication");
