/*
  Warnings:

  - Added the required column `build` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatToBuild` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "build" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL,
ADD COLUMN     "whatToBuild" TEXT NOT NULL;
