-- CreateTable
CREATE TABLE "slacks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDisplayname" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "slacks_userId_idx" ON "slacks"("userId");

-- AddForeignKey
ALTER TABLE "slacks" ADD CONSTRAINT "slacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
