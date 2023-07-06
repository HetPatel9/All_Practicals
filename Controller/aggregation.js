const Order = require("../Models/orderModel");

const mostPurchased = async (req, res, next) => {
  try {
    const users = await Order.aggregate([
      {
        $unwind: "$products"
      },
      {
        $group: {
          _id: "$products",
          user: { $push: "$userId" },
          totalUser: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "users"
        }
      },
      {
        $project: {
          _id: 0,
          user: 0,
          product: { _id: 0, __v: 0 },
          users: { _id: 0, __v: 0, phone: 0, password: 0 }
        }
      },
      {
        $sort: { totalUser: -1 }
      }
    ]);
    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      messsage: error.messsage
    });
  }
};

module.exports = { mostPurchased };
