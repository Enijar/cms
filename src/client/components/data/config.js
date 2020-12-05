import React from "react";

export default {
  fields: {
    text: {
      Component: React.lazy(() => import("./fields/text/text")),
    },
    richText: {
      Component: React.lazy(() => import("./fields/rich-text/rich-text")),
    },
    related: {
      Component: React.lazy(() => import("./fields/related/related")),
    },
  },
};
