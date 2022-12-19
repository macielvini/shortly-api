import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/urls.middleware.js";
import { create } from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", validateSchema, validateToken, create);

export default router;
