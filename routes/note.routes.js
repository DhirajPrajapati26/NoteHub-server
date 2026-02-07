import express from "express";
import {
  createNote,
  getNotes,
  deleteNote,
  toggleComplete,
  togglePin,
  editNote,
} from "../controllers/note.ctrl.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", editNote);
router.delete("/:id", deleteNote);
router.patch("/:id/pin", togglePin);
router.patch("/:id/complete", toggleComplete);

export default router;
