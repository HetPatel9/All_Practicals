const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(".env");

const app = require("./app");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true
  })
  .then((con) => {
    console.log("database connected");
  });

app.listen(process.env.PORT, () => {
  console.log("App is start...");
});
