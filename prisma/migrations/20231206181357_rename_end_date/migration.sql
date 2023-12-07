/*
  Warnings:

  - You are about to drop the column `EndDate` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "EndDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
