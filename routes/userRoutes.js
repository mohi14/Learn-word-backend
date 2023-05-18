const express = require("express");
const { registerUser } = require("../controller/userController");

const router = express.Router();

// register new user
router.post("/signup", registerUser);

module.exports = router;
