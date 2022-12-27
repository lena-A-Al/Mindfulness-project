const express = require("express");
const { User } = require("../db");
const router = express.Router();

//get all users
router.get("/", async (req, res, next) => {
  const users = await User.findAll();
  res.send(users);
});

router.post("/", async (req, res, next) => {
  const { username, password, email } = req.body;

  const users = await User.findAll();
  const usersEmail = users.map((user) => user.email);

  if (usersEmail.includes(email)) {
    return res.sendStatus(403);
  }

  const newUser = await User.create({
    username,
    password,
    email,
  });

  res.sendStatus(204);
});

module.exports = router;
