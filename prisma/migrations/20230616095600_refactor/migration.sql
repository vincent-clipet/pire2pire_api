/*
  Warnings:

  - You are about to drop the column `userIsCoach` on the `FormationUser` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `is_finished` on the `UserLesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_author_fkey";

-- AlterTable
ALTER TABLE "Formation" ADD COLUMN     "coachId" INTEGER;

-- AlterTable
ALTER TABLE "FormationUser" DROP COLUMN "userIsCoach";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER;

-- AlterTable
ALTER TABLE "UserLesson" DROP COLUMN "is_finished",
ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Formation" ADD CONSTRAINT "Formation_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
