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

orderSchema.pre(/find/, function (next) {
  this.populate({ path: "userId", select: "-_id" }).populate({
    path: "products",
    select: "-_id -__v"
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
