-- DropForeignKey
ALTER TABLE "personal_quarter" DROP CONSTRAINT "personal_quarter_favoritedById_fkey";

-- AlterTable
ALTER TABLE "personal_quarter" ALTER COLUMN "favoritedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "personal_quarter" ADD CONSTRAINT "personal_quarter_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
