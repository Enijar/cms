import React from "react";
import "./data.scss";
import config from "./config";

export const DataContext = React.createContext({});

export default function Data({ onChange, fields = [] }) {
  const [data, setData] = React.useState({});

  const setField = React.useCallback((name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  }, []);

  React.useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [onChange, data]);

  return (
    <DataContext.Provider value={{ data, setField }}>
      <div className="data">
        {fields.map((field, index) => {
          if (!config.fields.hasOwnProperty(field.type)) {
            console.warn(`No component for type "${field.type}"`);
            return null;
          }
          const { Component } = config.fields[field.type];
          return <Component key={index} name={field.name} {...field.props} />;
        })}
      </div>
    </DataContext.Provider>
  );
}
