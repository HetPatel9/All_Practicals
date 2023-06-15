const express = require("express");
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This is new landing page",
  });
});
app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
