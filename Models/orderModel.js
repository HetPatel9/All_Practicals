const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product"
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
