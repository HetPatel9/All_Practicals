const express = require("express");
const orderDetailsController = require("./../Controller/OrderDetailesController");

const router = express.Router();

router
  .route("/")
  .post(orderDetailsController.createOrderDetail)
  .get(orderDetailsController.getAllOrderDetails);

module.exports = router;
