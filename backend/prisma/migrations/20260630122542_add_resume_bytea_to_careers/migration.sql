/*
  Warnings:

  - You are about to drop the column `resumeFileId` on the `careers` table. All the data in the column will be lost.
  - Added the required column `resumeData` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeName` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeSize` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeType` to the `careers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "careers" DROP CONSTRAINT "careers_resumeFileId_fkey";

-- AlterTable
ALTER TABLE "careers" DROP COLUMN "resumeFileId",
ADD COLUMN     "resumeData" BYTEA NOT NULL,
ADD COLUMN     "resumeName" VARCHAR(255) NOT NULL,
ADD COLUMN     "resumeSize" BIGINT NOT NULL,
ADD COLUMN     "resumeType" VARCHAR(100) NOT NULL,
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
