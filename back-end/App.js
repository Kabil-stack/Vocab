const express = require("express");
const app = express();
const vocabRoute = require("./Routes/vocabRoute");
const userRoute = require("./Routes/userRoute");
const globalErrorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/api/vocab", vocabRoute);
app.use("/api/user", userRoute);

app.use(globalErrorHandler);

module.exports = app;
