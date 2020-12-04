module.exports = {
  page: {
    fields: {
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
    },
  },
  blog: {
    fields: {
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
    },
  },
  tag: {
    fields: {
      name: {
        type: "text",
      },
    },
  },
};
