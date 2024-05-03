const express = require("express");
const router = express.Router();
const { getGameResult } = require("../controllers/gameResultController");

router.post("/", getGameResult);

module.exports = router;
