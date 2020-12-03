const path = require("path");

const basePath = path.resolve(__dirname, "..", "..", "..");

module.exports = {
  port: process?.env?.PORT ?? 3000,
  host: process?.env?.HOST ?? "localhost",
  dbFile: process?.env?.DB_FILE ?? "storage/db.json",
  paths: {
    base: basePath,
    storage: path.join(basePath, "storage"),
  },
};
