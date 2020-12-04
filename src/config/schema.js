const { R } = require("use-model-validation");

module.exports = {
  page: {
    fields: {
      title: {
        type: "text",
        rules: [R.required(), R.max(255)],
      },
      description: {
        type: "richText",
        rules: [R.required()],
      },
      blogs: {
        type: "related",
        collection: "blog",
      },
    },
  },
  blog: {
    fields: {
      title: {
        type: "text",
        rules: [R.required(), R.max(255)],
      },
      content: {
        type: "richText",
        rules: [R.required()],
      },
      tags: {
        type: "related",
        collection: "tag",
      },
    },
  },
  tag: {
    fields: {
      name: {
        type: "text",
        rules: [R.required(), R.max(255)],
      },
    },
  },
};
