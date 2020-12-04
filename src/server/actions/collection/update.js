const collections = require("../../services/collections");

module.exports = async function collectionUpdate(req, res) {
  const { collection, id } = req?.params ?? {};
  if (!collections.hasOwnProperty(collection)) {
    return res.status(404).json({ errors: { server: "No collection found" } });
  }
  const data = req?.body ?? {};
  const entity = await collections[collection].find(parseInt(id));
  if (entity === null) {
    return res.status(404).json({ errors: { server: "No entity found" } });
  }
  const model = collections[collection].model.fresh(data);
  const { valid, errors } = model.validate();
  if (!valid) {
    return res.status(422).json({ errors });
  }
  const updatedEntity = await collections[collection].update(entity.id, data);
  res.json({ data: updatedEntity });
};
