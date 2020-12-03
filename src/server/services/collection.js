const database = require("./database");

const SCHEMAS = {};

async function getRelated(name, ids) {
  const schema = SCHEMAS[name] ?? {};
  return Promise.all(ids.map((id) => find(name, schema, id)));
}

async function hydrateRelated(entity, schema) {
  for (const name in schema) {
    if (!schema.hasOwnProperty(name)) continue;
    if (schema[name].type === "related") {
      const ids = entity?.values?.[name] ?? [];
      if (ids.length === 0) continue;
      const related = await getRelated(schema[name].collection, ids);
      entity.values[name] = related.filter((item) => item !== null);
    }
  }
}

async function find(name, schema, id) {
  const collections = await database.read();
  const { entities = [] } = collections?.[name] ?? {};
  const entity = entities.find((entity) => {
    return entity?.values?.id === id;
  });
  if (!entity) return null;
  await hydrateRelated(entity, schema);
  return entity?.values ?? null;
}

module.exports = {
  createCollection(name, schema) {
    SCHEMAS[name] = schema;

    return {
      async find(id) {
        return find(name, schema, id);
      },

      async all() {
        const collections = await database.read();
        const { entities = [] } = collections?.[name] ?? {};
        return Promise.all(
          entities.map(async (entity) => {
            await hydrateRelated(entity, schema);
            return entity?.values ?? {};
          })
        );
      },

      async create(entity) {
        return database.write(name, entity, { schema, mode: "create" });
      },

      async update(id, entity) {
        return database.write(
          name,
          { ...entity, id },
          { schema, mode: "update" }
        );
      },

      async remove(id) {
        return database.write(name, { id }, { schema, mode: "remove" });
      },
    };
  },
};
