#!/usr/bin/env node
const concurrently = require("concurrently");

concurrently(["node src/server/run.js", "npx react-scripts build"], {
  prefix: "name",
  killOthers: ["failure", "success"],
  restartTries: 3,
});
