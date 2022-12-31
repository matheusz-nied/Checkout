import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { CheckoutDayController } from "./controllers/CheckoutDayController";

const router = Router();

const checkoutDayController = new CheckoutDayController();
const authController = new AuthController();

router.post("/api/checkoutDay", checkoutDayController.create);

router.get("/api/checkoutDay/findOneByDay", checkoutDayController.findOneByDay);

router.get("/api/checkoutDay/findOneByID/:id", checkoutDayController.findOneByID);

router.get("/api/checkoutDay/listAll", checkoutDayController.findAllOfTheMonth);

router.put("/api/checkoutDay/:id", checkoutDayController.update);

router.delete("/api/checkoutDay/:id", checkoutDayController.delete);

router.post("/api/auth", authController.auth);

export { router };
