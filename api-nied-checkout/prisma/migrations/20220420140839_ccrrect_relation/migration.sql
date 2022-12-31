-- CreateTable
CREATE TABLE "checkout_day" (
    "id" TEXT NOT NULL,
    "cash_in_hand" DOUBLE PRECISION NOT NULL,
    "sale_day" DOUBLE PRECISION NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "reference_to" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "id_day_checkout" TEXT NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "checkout_day_day_key" ON "checkout_day"("day");

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_id_day_checkout_fkey" FOREIGN KEY ("id_day_checkout") REFERENCES "checkout_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
