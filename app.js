const express = require("express");
require("./DatabaseConnection");
require("./sync");
const queryRouter = require("./router/queryRouter");

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const orderRouter = require("./router/orderRouter");
const orderDetailRouter = require("./router/orderDetailRouter");

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/orderdetail", orderDetailRouter);
app.use(queryRouter);

app.listen(3000, () => {
  console.log("app is running...");
});
