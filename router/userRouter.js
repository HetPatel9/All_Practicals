const express = require("express");
const userController = require("./../Controller/UserController");

const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUser);

module.exports = router;
