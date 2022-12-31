import { Request, Response } from "express";
import { checkoutDayService } from "../services/CheckoutDayService";
import { logger } from "../util/logger";

export class CheckoutDayController {
    async create(request: Request, response: Response) {
        const { day, cash_in_hand_card, cash_in_hand_money, payments } =
            request.body;
        console.log(day, cash_in_hand_card, cash_in_hand_money, payments);
        let checkout_day;
        try {
            checkout_day = await checkoutDayService.create({
                day,
                cash_in_hand_card,
                cash_in_hand_money,
                payments,
            });
        } catch (err) {
            return response.status(400).send({ error: "Dia já existente" });
        }

        return response.json(checkout_day);
    }

    async findOneByDay(request: Request, response: Response) {
        const { day_checkoutDay } = request.body;

        const checkout_day = await checkoutDayService.findOneByDay(day_checkoutDay);

        return response.json(checkout_day);
    }

    async findOneByID(request: Request, response: Response) {
        const { id } = request.params;

        
        let checkout_day : any= ""
        try{
            checkout_day = await checkoutDayService.findOneByID(id);

        } catch (err) {
            logger.error(err);
        } finally {

            return response.json(checkout_day);
        }

    }

    async findAllOfTheMonth(request: Request, response: Response) {
        const days_checkout_day = await checkoutDayService.findAllOfTheMonth();

        return response.json(days_checkout_day);
    }

    async update(request: Request, response: Response) {
        const {
            day,
            cash_in_hand_card,

            cash_in_hand_money,
            payments,
        } = request.body;

        const checkout_day = await checkoutDayService.update({
            day,
            cash_in_hand_card,
            cash_in_hand_money,
            payments,
        });
        return response.json(checkout_day);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const delete_checkoutDay = await checkoutDayService.delete(id);

        return response.json(delete_checkoutDay);
    }
}
