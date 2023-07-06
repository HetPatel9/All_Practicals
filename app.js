const express = require("express");
const userRouter = require("./Router/userRouter");
const productRouter = require("./Router/productRouter");
const orderRouter = require("./Router/orderRouter");
const aggregateRouter = require("./Router/aggregateRouter");
const cp = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cp());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/aggregation", aggregateRouter);

module.exports = app;
