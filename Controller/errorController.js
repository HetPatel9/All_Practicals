module.exports = (err, req, res, next) => {
  err.status = err.status || 'ERROR';
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message
  });
  next();
};
