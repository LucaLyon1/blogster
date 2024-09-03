/*
  Warnings:

  - You are about to drop the column `salaryRange` on the `JobOffer` table. All the data in the column will be lost.
  - Added the required column `jobType` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryLower` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryUpper` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workLocation` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobOffer" DROP COLUMN "salaryRange",
ADD COLUMN     "jobType" TEXT NOT NULL,
ADD COLUMN     "salaryLower" INTEGER NOT NULL,
ADD COLUMN     "salaryUpper" INTEGER NOT NULL,
ADD COLUMN     "workLocation" TEXT NOT NULL;
