/*
  Warnings:

  - Changed the type of `products` on the `Cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Cart_userId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "products",
ADD COLUMN     "products" INTEGER NOT NULL;
