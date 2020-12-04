import React from "react";

export default {
  text: {
    Component: React.lazy(() => import("./text/text")),
  },
  richText: {
    Component: React.lazy(() => import("./rich-text/rich-text")),
  },
};
