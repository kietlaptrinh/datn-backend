import { Router } from "express";
import {
  createRoom,
  listRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomGraph,
} from "../controllers/rooms.controller.js";

const router = Router();

router.post("/", createRoom);
router.get("/", listRooms);
router.get("/:id", getRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/:id/graph", getRoomGraph);

export default router;
