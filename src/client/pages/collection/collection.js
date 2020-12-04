import React from "react";
import "./collection.scss";
import Page from "../../components/page/page";
import api from "../../services/api";

export default function Collection({ match }) {
  const { collection } = match.params;
  const [fields, setFields] = React.useState([]);

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

  React.useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <Page name="collection">
      <h1>Collection</h1>
    </Page>
  );
}
