import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import {
  validateSchema,
  validateShortUrl,
  validateUrlId,
  validateUrlOwner,
} from "../middlewares/urls.middleware.js";
import {
  create,
  deleteUrl,
  find,
  redirect,
} from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", validateSchema, validateToken, create);
router.get(
  "/urls/:id",
  validateUrlId,
  validateUrlId,
  validateToken,
  validateUrlOwner,
  find
);
router.get("/urls/open/:shortUrl", validateShortUrl, redirect);
router.delete(
  "/urls/:id",
  validateUrlId,
  validateToken,
  validateUrlOwner,
  deleteUrl
);

export default router;
