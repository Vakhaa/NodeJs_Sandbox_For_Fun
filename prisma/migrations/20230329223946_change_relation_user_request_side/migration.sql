/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Request` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requestId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requestId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_ownerId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "requestId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_requestId_key" ON "User"("requestId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
