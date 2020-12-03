const { createCollection } = require("../services/collection");

module.exports = createCollection("page", {
  title: {
    type: "text",
  },
  description: {
    type: "richText",
  },
  blogs: {
    type: "related",
    collection: "blog",
  },
});
