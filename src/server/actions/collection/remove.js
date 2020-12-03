const collections = require("../../services/collections");

module.exports = async function collectionRemove(req, res) {
  let { collection, id } = req?.params ?? {};
  if (!collections.hasOwnProperty(collection)) {
    return res.status(404).json({ errors: { server: "No collection found" } });
  }
  id = parseInt(id);
  const entity = await collections[collection].find(id);
  if (entity === null) {
    return res.status(404).json({ errors: { server: "No entity found" } });
  }
  await collections[collection].remove(id);
  res.json({ messages: { server: "Entity removed" } });
};
