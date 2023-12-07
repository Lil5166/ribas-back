-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_bookingId_fkey";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "bookingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
