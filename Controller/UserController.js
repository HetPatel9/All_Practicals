const User = require("./../models/User");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body, {
      fields: ["name", "phone", "address", "email"]
    });
    res.status(201).json({
      status: "successs",
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json({
      status: "successs",
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};
module.exports = { createUser, getAllUser };
