const express = require("express");
const router = express.Router();
const { mostPurchased } = require("./../Controller/aggregation");

router.get("/popularproduct", mostPurchased);

module.exports = router;
