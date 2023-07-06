const express = require("express");
const router = express.Router();
const {
  getOrder,
  getAllOrders,
  addOrder
} = require("./../Controller/orderController");

router.get("/", getAllOrders);

router.post("/", addOrder);

router.get("/:id", getOrder);

module.exports = router;
