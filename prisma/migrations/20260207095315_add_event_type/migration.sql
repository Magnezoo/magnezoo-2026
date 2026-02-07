/*
  Warnings:

  - Added the required column `event` to the `EventStartSubscriber` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Event" AS ENUM ('MAGNEZOO', 'BOOTH');

-- AlterTable
ALTER TABLE "EventStartSubscriber" ADD COLUMN     "event" "Event" NOT NULL;
