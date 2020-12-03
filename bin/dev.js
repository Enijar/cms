#!/usr/bin/env node
const concurrently = require("concurrently");

concurrently(
  [
    "npx nodemon --watch src/server src/server/run.js",
    "npx react-scripts start",
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
  }
);
