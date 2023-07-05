const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const { sequelize } = require("../DatabaseConnection");
const OrderDetail = require("../models/OrderDetail");

const fetchAllUserOrder = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          attributes: ["name"],
          through: {
            attributes: []
          }
        },
        {
          model: User,
          attributes: ["name"]
        }
      ],
      attributes: [
        "id",
        "orderDate",
        "deliveryDate",
        [
          sequelize.literal("DATEDIFF(deliveryDate,orderDate)"),
          "Expected_delivery_date"
        ]
      ]
    });
    console.log(JSON.stringify(orders, null, 2));
    res.status(200).json({
      status: "success",
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const undeliveredOrder = async (req, res) => {
  try {
    const undeliveredOrders = await Order.findAll({
      where: { status: "undelivered" }
    });
    res.status(200).json({
      status: "success",
      data: undeliveredOrders
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const activeUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name"],
      include: {
        model: Order,
        required: true,
        attributes: []
      }
    });

    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const inactiveUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Order
      },
      where: {
        "$orders.userId$": null
      }
    });
    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const recentOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["orderDate", "DESC"]],
      limit: 5
    });
    res.status(200).json({
      status: "success",
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const popularPorduct = async (req, res) => {
  try {
    const products = await OrderDetail.findAll({
      group: "productId",
      attributes: [
        "productId",

        [sequelize.fn("COUNT", sequelize.col("productId")), "Total_Sold"]
      ],
      include: { model: Product, attributes: ["name"] },
      order: [["Total_Sold", "DESC"]],
      limit: 5
    });
    res.status(200).json({
      status: "success",
      data: products
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const mostExpensiveOrder = async (req, res) => {
  try {
    const expensiveOrder = await OrderDetail.findAll({
      group: ["orderId"],
      include: { model: Product, attributes: [] },
      attributes: [
        "orderId",
        [sequelize.fn("SUM", sequelize.col("product.price")), "Bill_Amount"],
        [sequelize.fn("COUNT", sequelize.col("productId")), "Total_Product"]
      ],
      order: [["Bill_Amount", "DESC"]],
      limit: 1
    });
    res.status(200).json({
      status: "success",
      data: expensiveOrder
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const mostCheapOrder = async (req, res) => {
  try {
    const expensiveOrder = await OrderDetail.findAll({
      group: ["orderId"],
      include: { model: Product, attributes: [] },
      attributes: [
        "orderId",
        [sequelize.fn("SUM", sequelize.col("product.price")), "Bill_Amount"],
        [sequelize.fn("COUNT", sequelize.col("productId")), "Total_Product"]
      ],
      order: [["Bill_Amount", "ASC"]],
      limit: 1
    });
    res.status(200).json({
      status: "success",
      data: expensiveOrder
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

module.exports = {
  fetchAllUserOrder,
  undeliveredOrder,
  activeUsers,
  inactiveUsers,
  recentOrders,
  popularPorduct,
  mostExpensiveOrder,
  mostCheapOrder
};
