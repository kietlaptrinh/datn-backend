import { Router } from "express";
import { listEvents, createEvent, updateEvent, deleteEvent } from "../controllers/timeline.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", listEvents);
router.post("/", upload.array("images", 10), createEvent);
router.put("/:id", upload.array("images", 10), updateEvent);
router.delete("/:id", deleteEvent);

export default router;