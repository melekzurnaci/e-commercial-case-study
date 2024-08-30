import { Router } from "../utils/router";
import { updateUserPermission } from "../controllers/user";
import authMiddleware from "../middlewares/auth.middleware";

export const userRoutes = new Router();

// POST /users
userRoutes.patch(
  "/:Id/permission",
  authMiddleware.adminPermission,
  updateUserPermission
);
