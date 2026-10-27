const dotenv = require("dotenv");

const mongoose = require("mongoose");
const app = require("./App");

const PORT = process.env.PORT || 3000;

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DB_PASSWORD,
);

app.get("/", (req, res) => {
  res.send(`App is running on Port ${PORT}...`);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}..`);
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected successful");
  })
  .catch((err) => {
    console.log("Error : ", err);
  });
