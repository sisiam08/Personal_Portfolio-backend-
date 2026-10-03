-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- Backfill existing rows so the public order is unchanged:
-- featured desc, status asc, createdAt desc (the previous API sort).
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      ORDER BY "featured" DESC, "status" ASC, "createdAt" DESC, id ASC
    ) - 1 AS rn
  FROM "Project"
)
UPDATE "Project" AS p
SET "order" = ranked.rn
FROM ranked
WHERE p.id = ranked.id;

-- CreateIndex
CREATE INDEX "Project_order_idx" ON "Project"("order");
