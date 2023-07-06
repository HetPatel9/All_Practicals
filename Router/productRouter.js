const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProduct
} = require("./../Controller/productController");
const { authenticate } = require("./../Controller/authController");

router.get("/", authenticate, getAllProducts);
router.post("/", authenticate, addProduct);
router.get("/:id", authenticate, getProduct);

module.exports = router;
