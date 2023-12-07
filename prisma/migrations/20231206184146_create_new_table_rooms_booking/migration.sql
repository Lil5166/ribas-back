/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_bookingId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "bookingId";

-- CreateTable
CREATE TABLE "RoomsBookings" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,

    CONSTRAINT "RoomsBookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomsBookings" ADD CONSTRAINT "RoomsBookings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsBookings" ADD CONSTRAINT "RoomsBookings_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
