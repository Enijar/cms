import React from "react";
import "./text.scss";
import Field from "../../field/field";

export default function Text({ name }) {
  return (
    <Field type="text">
      <div>{name}</div>
    </Field>
  );
}
