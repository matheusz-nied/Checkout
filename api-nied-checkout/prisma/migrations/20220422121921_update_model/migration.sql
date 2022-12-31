/*
  Warnings:

  - Added the required column `cash_in_hand_card` to the `checkout_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cash_in_hand_money` to the `checkout_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit` to the `checkout_day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkout_day" ADD COLUMN     "cash_in_hand_card" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cash_in_hand_money" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "profit" DOUBLE PRECISION NOT NULL;
