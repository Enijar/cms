#!/usr/bin/env node
const concurrently = require("concurrently");

concurrently(
  [
    "npx nodemon --watch src/server --watch src/config src/server/run.js",
    "npx react-scripts start",
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
  }
);
