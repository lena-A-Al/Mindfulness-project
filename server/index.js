const dotenv = require("dotenv");
dotenv.config();
console.log(process.env);
const app = require("./app");
const seed = require("./db/seed");

const init = async () => {
  try {
    if (process.env.SEED === "true") await seed();
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`listening on port: ${port}  http://localhost:${port} 🛒`)
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();
