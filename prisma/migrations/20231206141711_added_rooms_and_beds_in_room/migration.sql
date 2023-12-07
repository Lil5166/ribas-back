/*
  Warnings:

  - Added the required column `beds` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rooms` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "rooms" INTEGER NOT NULL;
