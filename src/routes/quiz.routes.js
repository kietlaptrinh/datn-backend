import { Router } from "express";
import {
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  saveResult,    
  getMyHistory,  
  getLeaderboard  
} from "../controllers/quiz.controller.js";

const router = Router();

router.get("/", listQuestions);
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

router.post("/result", saveResult);    
router.get("/history", getMyHistory);   
router.get("/leaderboard", getLeaderboard); 

export default router;