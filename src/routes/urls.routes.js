import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import {
  validateSchema,
  validateUrlId,
} from "../middlewares/urls.middleware.js";
import { create, findById } from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", validateSchema, validateToken, create);
router.get("/urls/:id", validateUrlId, findById);

export default router;
