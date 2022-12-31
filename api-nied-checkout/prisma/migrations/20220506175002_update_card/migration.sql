/*
  Warnings:

  - Added the required column `cash_in_hand_card_to_be_released` to the `checkout_day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkout_day" ADD COLUMN     "cash_in_hand_card_to_be_released" DOUBLE PRECISION NOT NULL;
