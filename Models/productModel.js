const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    length: 200
  },
  quantity: {
    type: Number,
    required: true
  },
  totalRatings: {
    type: Number
  },
  averageRatings: {
    type: Number,
    max: [5, "Rating must be less then 5"],
    min: [1, "Rating must be more then 1"]
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
