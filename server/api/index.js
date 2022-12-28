const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./usersRouter"));
router.use("/notes", require("./notesRouter"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
