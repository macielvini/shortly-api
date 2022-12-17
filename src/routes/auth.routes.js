import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";
import { validateSignUp } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", validateSignUp, signUp);

export default router;
