-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "heroOrder" INTEGER;

-- CreateIndex
CREATE INDEX "Skill_heroOrder_idx" ON "Skill"("heroOrder");
