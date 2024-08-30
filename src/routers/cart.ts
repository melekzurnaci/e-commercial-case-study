import { addProductToCart, getCart, deleteCart } from "../controllers/cart";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { Router } from "../utils/router";

export const cartRoutes = new Router();

// get /carts/
cartRoutes.get("/:id", authMiddleware.authenticationMiddleware, getCart);
cartRoutes.post(
  "/",
  authMiddleware.authenticationMiddleware,
  validationMiddleware.addProduct,
  addProductToCart
);
cartRoutes.delete("/:id", authMiddleware.authenticationMiddleware, deleteCart);
