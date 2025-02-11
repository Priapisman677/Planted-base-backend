/*
  Warnings:

  - You are about to drop the column `updatedAd` on the `items` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "updatedAd",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
