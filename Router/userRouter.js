const express = require("express");
const router = express.Router();
const {
  addUser,
  getAllUsers,
  getUser
} = require("./../Controller/userController");
const { login, logout, register } = require("./../Controller/authController");

router.post("/login", login);
router.post("/signup", register);
router.post("/logout", logout);

router.get("/", getAllUsers);
router.post("/", addUser);
router.get("/:id", getUser);

module.exports = router;
