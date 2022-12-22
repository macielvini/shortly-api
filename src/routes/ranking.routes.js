import { Router } from "express";
import { find } from "../controllers/ranking.controller.js";

const router = Router();

router.get("/ranking", find);

export default router;
