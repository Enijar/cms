const { createCollection } = require("../services/collection");

module.exports = createCollection("blog", {
  title: {
    type: "text",
  },
  content: {
    type: "richText",
  },
  tags: {
    type: "related",
    collection: "tag",
  },
});
