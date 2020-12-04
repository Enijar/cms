import React from "react";
import "./rich-text.scss";
import Field from "../../field/field";

export default function RichText({ name }) {
  return (
    <Field type="rich-text">
      <div>{name}</div>
    </Field>
  );
}
