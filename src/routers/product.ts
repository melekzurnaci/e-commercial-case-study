import { Router } from "../utils/router";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

export const productRoutes = new Router();

// POST /products
productRoutes.post(
  "/",
  authMiddleware.adminPermission,
  validationMiddleware.productValidation,
  createProduct
);
// // GET /products
productRoutes.get("/", authMiddleware.authenticationMiddleware, getAllProducts);
// PATCH /products/:id
productRoutes.patch("/:id", authMiddleware.adminPermission, updateProduct);
// DELETE /products/:id
productRoutes.delete("/:id", authMiddleware.adminPermission, deleteProduct);
