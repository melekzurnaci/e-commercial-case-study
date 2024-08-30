// src/routes/index.ts
import { Router } from "../utils/router";
import { productRoutes } from "./product";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";
import { cartRoutes } from "./cart";
import { orderRoutes } from "./order";

export const initializeRoutes = (router: Router) => {
  router.use("/auth", authRoutes);
  router.use("/users", userRoutes);
  router.use("/products", productRoutes);
  router.use("/carts", cartRoutes);
  router.use("/orders", orderRoutes);
};
