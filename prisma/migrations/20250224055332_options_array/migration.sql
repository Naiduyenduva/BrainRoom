/*
  Warnings:

  - You are about to drop the column `option1` on the `mcqs` table. All the data in the column will be lost.
  - You are about to drop the column `option2` on the `mcqs` table. All the data in the column will be lost.
  - You are about to drop the column `option3` on the `mcqs` table. All the data in the column will be lost.
  - You are about to drop the column `option4` on the `mcqs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "mcqs" DROP COLUMN "option1",
DROP COLUMN "option2",
DROP COLUMN "option3",
DROP COLUMN "option4",
ADD COLUMN     "options" TEXT[];
