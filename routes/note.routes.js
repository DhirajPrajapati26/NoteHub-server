import express from "express";
import {
  createNote,
  getNotes,
  deleteNote,
  toggleComplete,
  togglePin,
  editNote,
} from "../controllers/note.ctrl.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/",AuthMiddleware, createNote);
router.get("/",AuthMiddleware, getNotes);
router.put("/:id", AuthMiddleware, editNote);
router.delete("/:id", AuthMiddleware, deleteNote);
router.patch("/:id/pin", AuthMiddleware, togglePin);
router.patch("/:id/complete", AuthMiddleware, toggleComplete);

export default router;
