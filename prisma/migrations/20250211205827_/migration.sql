/*
  Warnings:

  - You are about to drop the column `lastTimeAccesed` on the `personal_quarter` table. All the data in the column will be lost.
  - Added the required column `modifiedAt` to the `personal_quarter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personal_quarter" DROP COLUMN "lastTimeAccesed",
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;
