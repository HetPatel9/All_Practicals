const Product = require('./../models/Product');

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body, {
      fields: ['name', 'price', 'description']
    });
    res.status(201).json({
      status: 'successs',
      data: product
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: 'successs',
      data: products
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.status(204).json({ status: 'success' });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err
    });
  }
};
module.exports = { createProduct, getAllProduct, deleteProduct };
