const http = require("http");

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("My http server!");
};
const server = http.createServer(requestListener);
server.listen(8000, "127.0.0.1", () => {
  console.log("listening the request.....");
});
