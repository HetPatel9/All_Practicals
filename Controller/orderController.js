const Order = require("./../Models/orderModel");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      length: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

const addOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.body.userId,
      products: req.body.products
    });
    res.status(200).json({
      status: "success",
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

module.exports = { getAllOrders, getOrder, addOrder };
