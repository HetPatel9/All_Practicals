const express = require("express");
const orderController = require("./../Controller/OrderController");

const router = express.Router();

router
  .route("/")
  .post(orderController.createOrder)
  .get(orderController.getAllOrder);

module.exports = router;
