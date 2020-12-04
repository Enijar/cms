const schema = require("../../config/schema");
const { createCollection } = require("./collection");

const collections = {};

for (const name in schema) {
  if (!schema.hasOwnProperty(name)) continue;
  collections[name] = createCollection(name, schema[name].fields);
}

module.exports = collections;
