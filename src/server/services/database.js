const fs = require("fs");
const path = require("path");
const config = require("../config");

const DB_FILE = path.join(config.paths.base, ...config.dbFile.split("/"));

module.exports = {
  async read() {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), "utf8");
    }
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  },

  async write(collection, entity, { schema, mode }) {
    const collections = await read();
    let { entities = [], nextId = 1 } = collections?.[collection] ?? {};
    let savedEntity = null;

    // Remove props that are not in the schema
    const internalProps = ["id"];
    if (["create", "update"].includes(mode)) {
      for (const name in entity) {
        if (!entity.hasOwnProperty(name) || internalProps.includes(name)) {
          continue;
        }
        if (!schema.hasOwnProperty(name)) {
          delete entity[name];
        }
      }

      // Do nothing if there are no properties on the entity
      if (Object.keys(entity).length === 0) {
        return null;
      }
    }

    if (mode === "create") {
      const id = nextId;
      nextId = id + 1;
      savedEntity = { ...entity, id };
      entities.push({ values: { ...savedEntity } });
    }

    if (mode === "update") {
      for (let i = 0, length = entities.length; i < length; i++) {
        if (entities[i]?.values?.id === entity?.id) {
          const { values = {} } = entities[i] ?? {};
          entities[i].values = { ...values, ...entity };
          savedEntity = { ...entities[i].values };
          break;
        }
      }
    }

    if (mode === "remove") {
      for (let i = 0, length = entities.length; i < length; i++) {
        if (entities[i]?.values?.id === entity?.id) {
          entities.splice(i, 1);
          break;
        }
      }
    }

    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(
        { ...collections, [collection]: { nextId, schema, entities } },
        null,
        2
      ),
      "utf8"
    );

    return savedEntity;
  },
};
