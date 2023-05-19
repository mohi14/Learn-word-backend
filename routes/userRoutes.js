const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  emailVerification,
} = require("../controller/userController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verifyEmail", emailVerification);
router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);

module.exports = router;
