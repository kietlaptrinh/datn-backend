import { Router } from "express";
import passport from "passport";
import {
  googleCallbackSuccess,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";

const router = Router();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  googleCallbackSuccess
);
router.get("/current_user", getCurrentUser);
router.get("/logout", logout);

export default router;