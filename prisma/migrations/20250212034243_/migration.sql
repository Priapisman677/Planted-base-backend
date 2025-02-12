-- DropIndex
DROP INDEX "lockers_userId_key";

-- AlterTable
ALTER TABLE "lockers" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "lockers_pkey" PRIMARY KEY ("id");
