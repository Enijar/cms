module.exports = {
  page: {
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
  blog: {
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
  tag: {
    name: {
      type: "text",
    },
  },
};
