const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);

module.exports = router;
