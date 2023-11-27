/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Course_creatorId_idx";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "creatorId";

-- CreateTable
CREATE TABLE "UserCourse" (
    "courseId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("courseId","creatorId")
);
