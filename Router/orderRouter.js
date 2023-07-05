const express = require("express");
const router = express.Router();
const orderController = require("./../Controller/orderController");

router.route("/").get(orderController.getOrders).post(orderController.addOrder);

module.exports = router;
