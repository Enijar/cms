import React from "react";
import "./field.scss";

export default function Field({ type, children }) {
  return <div className={`data-field data-field--${type}`}>{children}</div>;
}

Field.Label = ({ children }) => {
  return <div className="data-field-label">{children}</div>;
};
