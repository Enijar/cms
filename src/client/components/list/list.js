import React from "react";
import "./list.scss";
import api from "../../services/api";

function getListableKeys(item, listableFields) {
  return Object.keys(item).filter((name) => listableFields.includes(name));
}

export default function List({ collection, fields = [] }) {
  const listableFields = React.useMemo(() => {
    const listableFields = [];
    fields.forEach((field) => {
      if (field?.props?.listable) {
        listableFields.push(field.name);
      }
    });
    return listableFields;
  }, [fields]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    api.get(`/collection/${collection}`).then((res) => {
      if (res.valid) {
        setData(res.data ?? []);
      }
    });
  }, []);

  return (
    <div className="list">
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <td>Title</td>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const columns = getListableKeys(row, listableFields);
            return (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => {
                  const value = row[column];
                  return <td key={`${rowIndex}-${columnIndex}`}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
