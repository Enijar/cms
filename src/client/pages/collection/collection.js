import React from "react";
import "./collection.scss";
import api from "../../services/api";
import Page from "../../components/page/page";
import Data from "../../components/data/data";

export default function Collection({ match }) {
  const { collection } = match.params;
  const [fields, setFields] = React.useState([]);

  const handleChange = React.useCallback((data) => {
    console.log(data);
  }, []);

  React.useEffect(() => {
    api.get("/schema").then(({ valid, data = {} }) => {
      if (!valid) return;
      const { fields = {} } = data?.[collection] ?? {};
      const fieldsArray = [];
      for (const name in fields) {
        if (!fields.hasOwnProperty(name)) continue;
        const { type, ...props } = fields[name];
        fieldsArray.push({ name, type, props: { ...props } });
      }
      setFields(fieldsArray);
    });
  }, [collection]);

  return (
    <Page name="collection">
      <Data fields={fields} onChange={handleChange} />
    </Page>
  );
}
