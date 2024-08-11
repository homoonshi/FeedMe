const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/ws",
        createProxyMiddleware({
            target: "https://i11b104.p.ssafy.io/api/",
            ws: false,
            changeOrigin: true,
        })
    );
};