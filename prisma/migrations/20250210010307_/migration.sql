/*
  Warnings:

  - You are about to drop the `_ItemToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemToTag" DROP CONSTRAINT "_ItemToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToTag" DROP CONSTRAINT "_ItemToTag_B_fkey";

-- DropTable
DROP TABLE "_ItemToTag";
