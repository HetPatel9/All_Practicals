const User = require("./../Models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.cookie("token", token);
  user.password = undefined;

  res.status(statusCode).json({
    status: "Loged in or Signed up",
    token,
    user
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("email or passwordnot found");
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.checkPassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }
    createSendToken(user, 200, res);
    next();
  } catch (error) {
    res.status(500).json({
      status: "fail to login",
      message: error.message
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      age: req.body.age,
      phone: req.body.phone
    });
    createSendToken(user, 201, res);
    next();
  } catch (error) {
    res.status(500).json({
      status: "fail to login",
      message: error.message
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("you have no token");
    }
    if (req.cookies.token) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        throw new Error("User belonging to this token is no longer exists");
      }
      req.user = currentUser;
    }
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail to Authenticate",
      message: error.message
    });
  }
};
exports.logout = (req, res, next) => {
  res.clearCookie(["token"]);
  res.status(200).json({ status: "success" });
};
