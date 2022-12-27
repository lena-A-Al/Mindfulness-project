const db = require("./db");
const { User } = require("./");

const seed = async () => {
  console.log("STARTING SEED");

  // Clear out any old data
  await db.sync({ force: true });

  const [leah] = await Promise.all([
    User.create({
      username: "leah",
      password: "123",
      email: "leah123@gmail.com",
      isAdmin: true,
    }),
  ]);
  console.log(leah);
  console.log("DONE RUNNING SEED...");
};

module.exports = seed;

// seed();
