const Order = require("./../models/Order");

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body, {
      fields: ["userId", "status", "orderDate", "deliveryDate"]
    });
    res.status(201).json({
      status: "successs",
      data: order
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(201).json({
      status: "successs",
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};
module.exports = { createOrder, getAllOrder };
