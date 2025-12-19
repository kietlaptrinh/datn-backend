import { Router } from "express";
import { upload } from "../middlewares/upload.js";
import {
  createPanorama,
  listPanoramas,
  getPanorama,
  updatePanorama,
  deletePanorama,
  listByRoom,
} from "../controllers/panoramas.controller.js";

const router = Router();

router.post("/", upload.single("image"), createPanorama);
router.get("/", listPanoramas);
router.get("/:id", getPanorama);
router.put("/:id", upload.single("image"), updatePanorama);
router.delete("/:id", deletePanorama);
router.get("/room/:roomId", listByRoom);

export default router;
