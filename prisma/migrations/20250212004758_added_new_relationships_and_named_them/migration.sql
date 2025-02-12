/*
  Warnings:

  - A unique constraint covering the columns `[favoritedById]` on the table `personal_quarter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `favoritedById` to the `personal_quarter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personal_quarter" ADD COLUMN     "favoritedById" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "personal_quarter_favoritedById_key" ON "personal_quarter"("favoritedById");

-- AddForeignKey
ALTER TABLE "personal_quarter" ADD CONSTRAINT "personal_quarter_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
