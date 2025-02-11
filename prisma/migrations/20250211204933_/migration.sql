-- CreateTable
CREATE TABLE "personal_quarter" (
    "id" SERIAL NOT NULL,
    "lockerCapacity" INTEGER NOT NULL,
    "zone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastTimeAccesed" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personal_quarter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "personal_quarter" ADD CONSTRAINT "personal_quarter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
