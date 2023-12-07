/*
  Warnings:

  - You are about to drop the column `avaliable_rooms` on the `Hotel` table. All the data in the column will be lost.
  - Added the required column `EndDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "EndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "avaliable_rooms";
