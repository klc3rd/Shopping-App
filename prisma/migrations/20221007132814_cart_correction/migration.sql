/*
  Warnings:

  - Changed the type of `zip` on the `Orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "zip",
ADD COLUMN     "zip" INTEGER NOT NULL;
