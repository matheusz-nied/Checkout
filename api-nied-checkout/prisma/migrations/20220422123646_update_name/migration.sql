/*
  Warnings:

  - You are about to drop the `pagamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pagamento" DROP CONSTRAINT "pagamento_id_day_checkout_fkey";

-- DropTable
DROP TABLE "pagamento";

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "reference_to" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "id_day_checkout" TEXT NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_id_day_checkout_fkey" FOREIGN KEY ("id_day_checkout") REFERENCES "checkout_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
