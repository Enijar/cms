module.exports = [
  {
    type: "collection",
    name: "page",
    fields: [
      {
        type: "text",
        name: "title",
      },
      {
        type: "richText",
        name: "description",
      },
      {
        type: "related",
        name: "blogs",
        related: {
          type: "hasMany",
          entity: "blog",
        },
      },
    ],
  },
  {
    type: "collection",
    name: "blog",
    fields: [
      {
        type: "text",
        name: "title",
      },
      {
        type: "richText",
        name: "body",
      },
      {
        type: "related",
        name: "tags",
        related: {
          type: "hasMany",
          entity: "tag",
        },
      },
    ],
  },
  {
    type: "collection",
    name: "tag",
    fields: [
      {
        type: "text",
        name: "name",
      },
    ],
  },
];
