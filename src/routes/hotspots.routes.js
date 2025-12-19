import { Router } from "express";
import {
  createHotspot,
  listHotspots,
  listForPanorama,
  updateHotspot,
  deleteHotspot,
} from "../controllers/hotspots.controller.js";

const router = Router();

router.post("/", createHotspot);
router.get("/", listHotspots);
router.get("/from/:panoId", listForPanorama);
router.put("/:id", updateHotspot);
router.delete("/:id", deleteHotspot);

export default router;
