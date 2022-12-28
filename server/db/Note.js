const db = require("./db");
const { TEXT, UUID, UUIDV4 } = db.Sequelize;

const Note = db.define("note", {
  // id: {
  //   type: UUID,
  //   primaryKey: true,
  //   defaultValue: UUIDV4,
  // },
  note: {
    type: TEXT,
    allowNull: true,
  },
});

module.exports = Note;
