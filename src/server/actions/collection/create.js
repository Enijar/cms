const collections = require("../../services/collections");

module.exports = async function collectionCreate(req, res) {
  const { collection } = req?.params ?? {};
  const data = req?.body ?? {};
  if (!collections.hasOwnProperty(collection)) {
    return res.status(404).json({ errors: { server: "No collection found" } });
  }
  const model = collections[collection].model.fresh(data);
  const { valid, errors } = model.validate();
  if (!valid) {
    return res.status(422).json({ errors });
  }
  const entity = await collections[collection].create(data);
  res.json({ data: entity });
};
