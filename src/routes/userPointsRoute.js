const express = require("express");
const router = express.Router();
const {
  getUserPoints,
  updateUserPoints,
} = require("../controllers/userPointsController");

router.get("/", getUserPoints);

router.put("/", updateUserPoints);

module.exports = router;
