/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ItemToTag" DROP CONSTRAINT "ItemToTag_itemId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "items_name_key" ON "items"("name");

-- AddForeignKey
ALTER TABLE "ItemToTag" ADD CONSTRAINT "ItemToTag_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
