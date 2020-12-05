import React from "react";
import "./text.scss";
import { DataContext } from "../../data";
import Field from "../../field/field";

export default function Text({ name, ...props }) {
  const { setField } = React.useContext(DataContext);

  const handleChange = React.useCallback(
    (event) => {
      setField(name, event.target.value);
    },
    [name]
  );

  return (
    <Field type="text">
      <Field.Label>{name}</Field.Label>
      <input name={name} onChange={handleChange} />
    </Field>
  );
}
