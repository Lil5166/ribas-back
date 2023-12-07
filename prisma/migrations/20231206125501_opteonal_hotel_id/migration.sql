-- DropForeignKey
ALTER TABLE "Administrator" DROP CONSTRAINT "Administrator_hotelId_fkey";

-- AlterTable
ALTER TABLE "Administrator" ALTER COLUMN "hotelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Administrator" ADD CONSTRAINT "Administrator_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
