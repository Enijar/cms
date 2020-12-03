const { createCollection } = require("../services/collection");

module.exports = createCollection("tag", {
  name: {
    type: "text",
  },
});
