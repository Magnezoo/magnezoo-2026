/*
  Warnings:

  - A unique constraint covering the columns `[user_id,post_id,isSalesApplication,salesType]` on the table `vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vote_user_id_post_id_isSalesApplication_salesType_key" ON "vote"("user_id", "post_id", "isSalesApplication", "salesType");
