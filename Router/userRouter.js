const express = require("express");
const router = express.Router();
const userController = require("./../Controller/userController");
const authController = require("./../Controller/authController");

router.route("/login").post(authController.login);
router.route("/signup").post(authController.register);
router.route("/logout").post(authController.logout);
router
  .route("/")
  .get(authController.authenticate, userController.getUsers)
  .post(userController.addUser);

module.exports = router;
