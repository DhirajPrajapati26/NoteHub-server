import express from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import {signup,login,logout,getMe} from "../controllers/auth.ctrl.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

/* Dashboard replacement */
router.get("/me", AuthMiddleware, getMe);

export default router;
