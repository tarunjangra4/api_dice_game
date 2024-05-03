require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userPointsRoute = require("./src/routes/userPointsRoute.js");
const bettingAmountRoute = require("./src/routes/bettingAmountRoute.js");
const gameResultRoute = require("./src/routes/gameResultRoute.js");
const rollDiceResultRoute = require("./src/routes/diceRollRoute.js");
const authRoute = require("./src/routes/authRoute.js");

app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
console.log("mongo ", MONGO_URL, MONGO_PASSWORD, MONGO_DB);

mongoose
  .connect(
    MONGO_URL +
      encodeURIComponent(MONGO_PASSWORD) + // URL-encode the password
      MONGO_DB
  )
  .catch((error) => {
    console.log("error ", error);
  });

app.use("/user", authRoute);

app.use((req, res, next) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];

  if (token == null)
    return res.status(401).json({ error: "Token is invalid." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
});

app.use("/points", userPointsRoute);

app.use("/bettingamount", bettingAmountRoute);

app.use("/rolldice", rollDiceResultRoute);

app.use("/result", gameResultRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
