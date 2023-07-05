const User = require("./../Models/userModel");
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      length: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      status: "user added",
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find();
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
