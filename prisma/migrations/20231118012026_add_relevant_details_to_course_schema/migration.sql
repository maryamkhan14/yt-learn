/*
  Warnings:

  - You are about to drop the column `authorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_authorId_idx";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "authorId",
DROP COLUMN "videoId",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Course_creatorId_idx" ON "Course"("creatorId");
