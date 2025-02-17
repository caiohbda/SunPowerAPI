/*
  Warnings:

  - You are about to drop the column `lastRefMonth` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `flag_description` on the `Report` table. All the data in the column will be lost.
  - Added the required column `flag_value` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "lastRefMonth";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "flag_description",
ADD COLUMN     "flag_value" DECIMAL(65,30) NOT NULL;
