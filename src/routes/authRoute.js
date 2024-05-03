const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   getUserPoints,
//   updateUserPoints,
// } = require("../controllers/userPointsController");

// router.get("/", getUserPoints);

// router.put("/", updateUserPoints);

// module.exports = router;
