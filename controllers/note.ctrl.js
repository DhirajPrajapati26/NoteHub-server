import Note from "../models/Note.js";

// Create note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content,
      userId: req.user.id,
    });
    res.status(201).json(note);
    console.log(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read all

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({
      pinned: -1,
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete note

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit note

export const editNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle pin

export const togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.pinned = !note.pinned;
    await note.save();
    res.json(note);
    // console.log()
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle complete

export const toggleComplete = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.completed = !note.completed;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
