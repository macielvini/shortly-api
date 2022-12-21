import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import {
  validateSchema,
  validateShortUrl,
  validateUrlId,
} from "../middlewares/urls.middleware.js";
import { create, find, redirect } from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", validateSchema, validateToken, create);
router.get("/urls/:id", validateUrlId, find);
router.get("/urls/open/:shortUrl", validateShortUrl, redirect);

export default router;
