const collections = require("../config/collections");
const { createCollection } = require("./services/collection");

const createdCollections = {};

for (const name in collections) {
  if (!collections.hasOwnProperty(name)) continue;
  createdCollections[name] = createCollection(name, collections[name]);
}

module.exports = createdCollections;
