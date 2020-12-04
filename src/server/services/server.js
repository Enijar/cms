const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("../config");

const app = express();
const router = express.Router();

app.use(cors());
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
