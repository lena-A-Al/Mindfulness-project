const db = require("./db");
const { TEXT, UUID, UUIDV4, DATE } = db.Sequelize;

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
  // myDate: {
  //   type: DATE,
  //   defaultValue: DATE.NOW,
  // },
});

module.exports = Note;
