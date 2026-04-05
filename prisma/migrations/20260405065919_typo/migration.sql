/*
  Warnings:

  - The values [ACRIL_KEYCHAIN] on the enum `SalesType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SalesType_new" AS ENUM ('ACRYLIC_KEYCHAIN', 'BADGE', 'STICKER');
ALTER TABLE "vote" ALTER COLUMN "salesType" TYPE "SalesType_new" USING ("salesType"::text::"SalesType_new");
ALTER TYPE "SalesType" RENAME TO "SalesType_old";
ALTER TYPE "SalesType_new" RENAME TO "SalesType";
DROP TYPE "public"."SalesType_old";
COMMIT;
