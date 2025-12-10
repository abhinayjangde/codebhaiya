-- CreateEnum
CREATE TYPE "ContentFormat" AS ENUM ('HTML', 'MARKDOWN');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "contentFormat" "ContentFormat" NOT NULL DEFAULT 'HTML';

-- CreateTable
CREATE TABLE "contact_submission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_submission_pkey" PRIMARY KEY ("id")
);
