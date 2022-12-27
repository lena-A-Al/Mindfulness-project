const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/stackathon-solo-project", {
  logging: false,
});

module.exports = db;
