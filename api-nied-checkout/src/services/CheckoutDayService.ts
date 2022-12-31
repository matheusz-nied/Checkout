import { prismaClient } from "../database/prismaClient";
import moment from "moment";
import { logger } from "../util/logger";
import { CheckoutDayAlreadyExistsException } from "../exceptions/CheckoutDayAlreadyExistsException";

interface ICheckoutDay {
    day: string;
    cash_in_hand_card: number;
    cash_in_hand_money: number;
    payments?: Array<IPayment> | undefined;
}
interface IPayment {
    day: string;
    reference_to: string;
    value: number;
}
class CheckoutDayService {
    async create(data_checkout_day: ICheckoutDay) {
        if (data_checkout_day.payments) {
            for (let payment of data_checkout_day.payments) {
                payment.day = data_checkout_day.day;
            }
        }


        const cash_in_hand = sum_cash_in_hand(
            data_checkout_day.cash_in_hand_card,
            data_checkout_day.cash_in_hand_money
        );

        const sale_day = calculate_sale_day(
            cash_in_hand,
            sum_payments(data_checkout_day.payments)
        );
        let checkout_day: any;
        checkout_day = await prismaClient.checkout_Day.create({
            data: {
                day: data_checkout_day.day,
                day_like_string: data_checkout_day.day,
                cash_in_hand_card: data_checkout_day.cash_in_hand_card,

                cash_in_hand_money: data_checkout_day.cash_in_hand_money,
                cash_in_hand,
                sale_day: sale_day,
                payments: {
                    create: data_checkout_day.payments,
                },
            },
        });

        return checkout_day;
    }

    async findOneByDay(day_checkoutDay: Date) {
        const checkout_day = await prismaClient.checkout_Day.findUnique({
            where: {
                day: day_checkoutDay,
            },
            include: {
                payments: true,
            },
        });
        return checkout_day;
    }

    async findOneByID(id: string) {
        const checkout_day = await prismaClient.checkout_Day.findUnique({
            where: {
                id: id,
            },
            include: {
                payments: true,
            },
        });
        return checkout_day;
    }

    async findAllOfTheMonth() {
        // KC

        const date = new Date();
        const textDate = date.toISOString();
        const MonthAndYearISO = textDate.substring(0, 8);

        const days_checkouDay = await prismaClient.checkout_Day.findMany({
            where: {
                day_like_string: {
                    startsWith: MonthAndYearISO,
                },
            },
            include: {
                payments: true,
            },
        });
        return days_checkouDay;
    }

    async update(data_checkout_day: ICheckoutDay) {
        const deleted_payments = await prismaClient.payment.deleteMany({
            where: {
                day: data_checkout_day.day,
            },
        });

        if (data_checkout_day.payments) {
            for (let payment of data_checkout_day.payments) {
                payment.day = data_checkout_day.day;
            }
        }

        const cash_in_hand = sum_cash_in_hand(
            data_checkout_day.cash_in_hand_card,
            data_checkout_day.cash_in_hand_money
        );

        const sale_day = calculate_sale_day(
            cash_in_hand,
            sum_payments(data_checkout_day.payments)
        );
        const checkout_day = await prismaClient.checkout_Day.update({
            where: {
                day: data_checkout_day.day,
            },
            data: {
                day: data_checkout_day.day,
                day_like_string: data_checkout_day.day,

                cash_in_hand_card: data_checkout_day.cash_in_hand_card,
                cash_in_hand_money: data_checkout_day.cash_in_hand_money,

                cash_in_hand,
                sale_day: sale_day,
                payments: {
                    create: data_checkout_day.payments,
                },
            },
        });
        return checkout_day;
    }

    async delete(id: string) {
        await prismaClient.payment.deleteMany({
            where: {
                id_day_checkout: id,
            },
        });
        const delete_checkoutDay = await prismaClient.checkout_Day.delete({
            where: { id },
        });

        return delete_checkoutDay;
    }
}

function calculate_sale_day(cash_in_hand: number, payments: number) {
    const sale_day = cash_in_hand + payments;

    return Number(sale_day);
}

function sum_cash_in_hand(
    cash_in_hand_card: number,
    cash_in_hand_money: number
): number {
    return cash_in_hand_card + cash_in_hand_money;
}
function sum_payments(payments: Array<any> | undefined) {
    let total_payments = 0;

    if (payments) {
        for (const payment of payments) {
            total_payments += payment.value;
        }
    }

    return total_payments;
}

const checkoutDayService = new CheckoutDayService();
export { checkoutDayService };
