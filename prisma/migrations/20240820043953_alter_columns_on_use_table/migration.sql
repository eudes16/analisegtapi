/*
  Warnings:

  - A unique constraint covering the columns `[xboxId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `xboxId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "xboxId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_xboxId_key" ON "User"("xboxId");
