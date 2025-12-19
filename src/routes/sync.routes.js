import { Router } from "express";
import { syncToAI } from "../controllers/sync.controller.js";

const router = Router();
router.post("/", syncToAI); 

export default router;