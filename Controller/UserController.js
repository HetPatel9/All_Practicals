const User = require('./../models/User');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body, {
      fields: ['name', 'phone', 'address', 'email']
    });
    res.status(201).json({
      status: 'successs',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: 'successs',
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err
    });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json({
      status: 'successs',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    res.status(204).json({ status: 'success' });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err
    });
  }
};
module.exports = { createUser, getAllUser, getUser, deleteUser };
