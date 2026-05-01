/*
  Warnings:

  - You are about to drop the `ProjectImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectImage" DROP CONSTRAINT "ProjectImage_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "image" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProjectImage";
