/*
  Warnings:

  - A unique constraint covering the columns `[gamerTag]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `gamerTag` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_xboxId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "xboxId" DROP NOT NULL,
ALTER COLUMN "gamerTag" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_gamerTag_key" ON "User"("gamerTag");
