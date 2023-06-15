const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const { promisify } = require('util');
const alert = require('alert');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res.cookie('jwt', token, cookieOptions);
  res.redirect('/login');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    alert('Please Provide Email and Password');
    return res.status(401).redirect('/login');
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    alert('Email or Password is Incorrect. Please try again.');
    return res.status(401).redirect('/login');
    // return next(new appError('Incorrect email or password', 401));
  }
  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  res.cookie('jwt', token, cookieOptions);
  res.cookie('name', user.name, cookieOptions);
  res.redirect('/welcome');
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) check the token, if it is there
  let token = req.cookies.jwt;

  if (!token) {
    alert('You are not loged in. Please login again');
    return res.status(401).redirect('/');
    // return next(new appError('You are not loged in. Please login again', 401));
  }

  // 2) if your is loged in then verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) If user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError('User belonging to this token is no longer exists', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.clearCookie('name');
  res.redirect('/');
  next();
};
