const express = require("express");
const bodyParser = require("body-parser");
const config = require("../configs/server");

const app = express();
const router = express.Router();

app.use(bodyParser.json({ extended: true }));
app.use(router);

module.exports = {
  router,
  listen(fn) {
    app.listen(config.port, () => {
      console.info(`[server] Running at http://${config.host}:${config.port}`);
      if (typeof fn === "function") {
        fn();
      }
    });
  },
};
