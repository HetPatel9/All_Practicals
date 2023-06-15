const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This is new landing page for students",
  });
});
app.listen(PORT, () => {
  console.log(
    `App is running on PORT ${PORT}.\nCurrent envrinment is ${process.env.NODE_ENV}`
  );
});
