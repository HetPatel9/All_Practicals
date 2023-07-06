const User = require("./../Models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      length: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

const addUser = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      age: req.body.age,
      phone: req.body.phone
    });
    res.status(200).json({
      status: "user added",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

module.exports = { addUser, getAllUsers, getUser };
