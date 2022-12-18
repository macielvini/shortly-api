import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import {
  validateSignUp,
  validateSignIn,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", validateSignIn, signIn);

export default router;
