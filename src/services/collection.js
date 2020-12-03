const fs = require("fs");
const path = require("path");
const config = require("../configs/server");

const dbFile = path.resolve(__dirname, "..", "..", ...config.dbFile.split("/"));

async function read() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({}, null, 2), "utf8");
  }
  return JSON.parse(fs.readFileSync(dbFile, "utf8"));
}

async function write(collection, entity, { schema, mode }) {
  const collections = await read();
  let { entities = [], nextId = 1 } = collections?.[collection] ?? {};
  let savedEntity = null;

  // Remove properties that are not in the schema
  if (["create", "update"].includes(mode)) {
    for (const name in entity) {
      if (!entity.hasOwnProperty(name)) continue;
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
      if (entities[i]?.id !== entity.id) continue;
      const { values = {} } = entities[i] ?? {};
      entities[i].values = { ...values };
      savedEntity = { ...entities[i].values };
      break;
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
    dbFile,
    JSON.stringify(
      { ...collections, [collection]: { nextId, schema, entities } },
      null,
      2
    ),
    "utf8"
  );

  return savedEntity;
}

module.exports = {
  createCollection(name, schema) {
    return {
      async find(id) {
        const collections = await read();
        const { entities = [] } = collections?.[name] ?? {};
        const entity =
          entities.find((entity) => {
            return entity?.values?.id === id;
          }) ?? null;
        if (entity === null) {
          return null;
        }
        return entity?.values ?? null;
      },

      async all() {
        const collections = await read();
        const { entities = [] } = collections?.[name] ?? {};
        return entities.map((entity) => {
          return entity?.values ?? {};
        });
      },

      async create(entity) {
        return write(name, entity, { schema, mode: "create" });
      },

      async update(id, entity) {
        return write(name, { ...entity, id }, { schema, mode: "update" });
      },

      async remove(id) {
        return write(name, { id }, { schema, mode: "remove" });
      },
    };
  },
};
