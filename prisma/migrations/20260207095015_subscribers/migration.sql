-- CreateTable
CREATE TABLE "EventStartSubscriber" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EventStartSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventStartSubscriber_email_key" ON "EventStartSubscriber"("email");
