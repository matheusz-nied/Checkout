/*
  Warnings:

  - Added the required column `day_like_string` to the `checkout_day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkout_day" ADD COLUMN     "day_like_string" TEXT NOT NULL;
