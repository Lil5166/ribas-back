/*
  Warnings:

  - The `avaliable_rooms` column on the `Hotel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `booking_price` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "booking_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "avaliable_rooms",
ADD COLUMN     "avaliable_rooms" INTEGER NOT NULL DEFAULT 0;
