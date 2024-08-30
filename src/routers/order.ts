import authMiddleware from "../middlewares/auth.middleware";
import { createOrder, cancelOrder } from "../controllers/order";
import { Router } from "../utils/router";

export const orderRoutes = new Router();

orderRoutes.post("/", authMiddleware.authenticationMiddleware, createOrder);
orderRoutes.post("/:id", authMiddleware.authenticationMiddleware, cancelOrder);
