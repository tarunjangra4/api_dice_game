const express = require("express");
const router = express.Router();
const { getBettingAmountsList } = require("../controllers/bettingAmounts");

router.get("/", getBettingAmountsList);

module.exports = router;
