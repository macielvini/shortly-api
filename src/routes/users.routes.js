import { Router } from "express";
import { find } from "../controllers/users.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users/me", validateToken, find);

export default router;
