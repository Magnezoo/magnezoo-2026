-- CreateEnum
CREATE TYPE "SalesType" AS ENUM ('ACRIL_KEYCHAIN', 'BADGE', 'STICKER');

-- AlterTable
ALTER TABLE "vote" ADD COLUMN     "salesType" "SalesType";
