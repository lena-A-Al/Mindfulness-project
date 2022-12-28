const express = require("express");
const { Note } = require("../db");
const router = express.Router();

//get all notes
router.get("/", async (req, res, next) => {
  const notes = await Note.findAll();
  res.send(notes);
});

//Create a new note
router.post("/", async (req, res, next) => {
  try {
    const { note } = req.body;
    const newNote = await Note.create({ note });
    res.sendStatus(204);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

module.exports = router;
