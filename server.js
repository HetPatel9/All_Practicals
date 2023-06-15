const express = require("express");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const upload = require("./upload");
const app = express();
const PORT = 3000;

const getPhotos = (req, res) => {
  fs.readdir(path.join(__dirname, "public/img"), function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    res.status(200).render("galary", {
      files,
    });
  });
};

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.status(200).render("index");
});
app.get("/galary", (req, res) => {
  getPhotos(req, res);
});
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", {
        msg: err,
      });
    } else {
      res.render("index", {
        msg: "Upload Succesfully",
      });
    }
  });
});
app.listen(PORT, () => {
  console.log("App sarted");
});
