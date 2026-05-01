/*
  Warnings:

  - Added the required column `challenges` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `futurePlan` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "challenges" TEXT NOT NULL,
ADD COLUMN     "futurePlan" TEXT NOT NULL;
