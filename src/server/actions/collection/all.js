const collections = require("../../data/collections");

module.exports = async function collectionAll(req, res) {
  const { collection } = req?.params ?? {};
  if (!collections.hasOwnProperty(collection)) {
    return res.status(404).json({ errors: { server: "No collection found" } });
  }
  const entities = await collections[collection].all();
  res.json({ data: entities });
};
