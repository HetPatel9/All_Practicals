const express = require("express");
const productController = require("./../Controller/ProductController");

const router = express.Router();

router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProduct);

module.exports = router;
