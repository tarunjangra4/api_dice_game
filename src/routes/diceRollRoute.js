const express = require("express");
const router = express.Router();
const { getDiceRollResult } = require("../controllers/diceRollController");

router.get("/", getDiceRollResult);

module.exports = router;
