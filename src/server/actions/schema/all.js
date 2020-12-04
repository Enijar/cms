const schema = require("../../../config/schema");

module.exports = async function schemaAll(req, res) {
  const data = { ...schema };
  for (const name in data) {
    if (!data.hasOwnProperty(name)) continue;
    for (const field in data[name].fields) {
      if (!data[name].fields.hasOwnProperty(field)) continue;
      delete data[name].fields[field].rules;
    }
  }
  res.json({ data });
};
