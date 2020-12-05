import React from "react";
import "./related.scss";
import Field from "../../field/field";

export default function Related({ name, ...props }) {
  return (
    <Field type="related">
      <Field.Label>{name}</Field.Label>
      <div>{name}</div>
    </Field>
  );
}
