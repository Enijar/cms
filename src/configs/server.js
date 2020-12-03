module.exports = {
  port: process?.env?.PORT ?? 3000,
  host: process?.env?.HOST ?? "localhost",
  dbFile: process?.env?.DB_FILE ?? "storage/db.json",
};
