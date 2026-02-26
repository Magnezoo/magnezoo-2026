/*
  Warnings:

  - A unique constraint covering the columns `[email,event]` on the table `EventStartSubscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EventStartSubscriber_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "EventStartSubscriber_email_event_key" ON "EventStartSubscriber"("email", "event");
