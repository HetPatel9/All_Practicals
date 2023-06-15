const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res
    .status(200)
    .send(`<h1>Hello World</h1><a href="/welcome">go to Welcome</a>`);
});
app.get("/welcome", (req, res) => {
  res.status(200).json({
    Name: "User",
    meassage: "Welcome",
  });
});

app.listen(3000, () => {
  console.log("Hello world");
});
