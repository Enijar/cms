import React from "react";
import "./data.scss";
import fields from "./fields/fields";

const DataContext = React.useContext({});

function Provider({ children }) {
  const [data, setData] = React.useState();

  const setField = React.useCallback((name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  }, []);

  return (
    <DataContext.Provider value={{ data, setField }}>
      {children}
    </DataContext.Provider>
  );
}

export { fields, DataContext };

export default function Data({ children }) {
  return (
    <Provider>
      <div className="data">{children}</div>
    </Provider>
  );
}
