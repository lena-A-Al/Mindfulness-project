const express = require("express");
const { Note } = require("../db");
const router = express.Router();

//get all notes
//GET localhost:3000/api/notes
router.get("/", async (req, res, next) => {
  const notes = await Note.findAll();
  res.send(notes);
});

//Create a new note
//POST localhost:3000/api/notes
router.post("/", async (req, res, next) => {
  try {
    const { note, score } = req.body;
    const newNote = await Note.create({ note, score });
    res.sendStatus(204);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

//Update a note:
// PUT localhost:3000/api/notes/:id
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    //read the data from the user note.
    const { note } = req.body;
    const findNote = await Note.findByPk(id);
    findNote.update({ note });
    res.send(200);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

//Delete a note
// DELETE localhost:3000/api/notes/:id
router.delete("/:id", async (req, res, next) => {
  const NOTFOUNDMESSAGE = "The note you are trying to delete does not exist!";
  try {
    const noteToDelete = await Note.findByPk(req.params.id);
    //if the note does not exist
    if (!noteToDelete) {
      throw new Error(NOTFOUNDMESSAGE);
    }
    await noteToDelete.destroy();
    res.sendStatus(202);
  } catch (err) {
    if (err.message === NOTFOUNDMESSAGE)
      return res.status(404).send({ message: NOTFOUNDMESSAGE });
  }
});

module.exports = router;
