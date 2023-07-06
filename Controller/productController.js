const { search } = require("../Router/orderRouter");
const Product = require("./../Models/productModel");

const getAllProducts = async (req, res, next) => {
  try {
    const {
      sort = "price",
      page = 1,
      limit = 15,
      fields = "",
      ...searchQuery
    } = req.query;

    const searchCondition = JSON.stringify(searchQuery).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const products = await Product.find(JSON.parse(searchCondition))
      .sort(sort.split(",").join(" "))
      .skip((page - 1) * limit)
      .limit(limit)
      .select(fields.split(",").join(" "));

    res.status(200).json({
      status: "Success",
      total_products: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      totalRatings: req.body.totalRatings,
      averageRatings: req.body.averageRatings
    });
    res.status(201).json({
      status: "Product added",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.find({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

module.exports = { addProduct, getAllProducts, getProduct };
