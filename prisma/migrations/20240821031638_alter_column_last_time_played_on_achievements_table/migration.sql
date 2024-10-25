/*
  Warnings:

  - You are about to drop the column `latTimePlayed` on the `Achievement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "latTimePlayed",
ADD COLUMN     "lastTimePlayed" TIMESTAMP(3);
