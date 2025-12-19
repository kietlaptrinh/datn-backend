import express from "express";
import { getAllUsers, updateUserRole, deleteUser, deleteUsersBulk } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/bulk-delete", deleteUsersBulk);
router.put("/:id/role", updateUserRole);
router.delete("/:id", deleteUser);

export default router;