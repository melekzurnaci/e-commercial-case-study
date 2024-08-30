import { Router } from "../utils/router";
import { singin, singup } from "../controllers/auth";

export const authRoutes = new Router();

// POST /auth

authRoutes.post("/singup", singup);

authRoutes.post("/singin", singin);
