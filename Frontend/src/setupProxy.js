const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/image", {
      target: "http://localhost:7000",
    })
  );
};