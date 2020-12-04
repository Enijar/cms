import React from "react";
import "./field.scss";

export default function Field({ type, children }) {
  return <div className={`data-field data-field--${type}`}>{children}</div>;
}
