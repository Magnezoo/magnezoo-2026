-- AlterTable
ALTER TABLE "post" ADD COLUMN     "isStudio" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "studioMgmtNo" INTEGER;

-- CreateIndex
CREATE INDEX "post_studioMgmtNo_idx" ON "post"("studioMgmtNo");

-- CreateIndex
CREATE INDEX "post_isStudio_idx" ON "post"("isStudio");
