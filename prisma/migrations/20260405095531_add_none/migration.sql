/*
  Warnings:

  - The primary key for the `vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `salesType` on table `vote` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "SalesType" ADD VALUE 'NONE';

-- DropIndex
DROP INDEX "vote_user_id_post_id_isSalesApplication_salesType_key";

-- AlterTable
ALTER TABLE "vote" DROP CONSTRAINT "vote_pkey",
ALTER COLUMN "salesType" SET NOT NULL,
ADD CONSTRAINT "vote_pkey" PRIMARY KEY ("user_id", "post_id", "isSalesApplication", "salesType");
