import { Router } from "express";
import { createArtifact, listByRoom, getArtifact, deleteArtifact, listAllArtifacts, updateArtifact } from "../controllers/artifacts.controller.js";
import { upload } from "../middlewares/upload.js";


const router = Router();

router.post("/", upload.single("image"), createArtifact);
router.get("/", listAllArtifacts);
router.get("/room/:roomId", listByRoom);
router.get("/:id", getArtifact);
router.delete("/:id", deleteArtifact);
router.put("/:id", upload.single("image"), updateArtifact);

export default router;