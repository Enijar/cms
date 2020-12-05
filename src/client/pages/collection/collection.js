import React from "react";
import "./collection.scss";
import schema from "../../../config/schema";
import Page from "../../components/page/page";
import List from "../../components/list/list";
import Data from "../../components/data/data";

export default function Collection({ match }) {
  const { collection } = match.params;
  const fields = React.useMemo(() => {
    const schemaFields = schema?.[collection]?.fields ?? {};
    const fields = [];
    for (const name in schemaFields) {
      if (!schemaFields.hasOwnProperty(name)) continue;
      const { type, ...props } = schemaFields[name];
      fields.push({ name, type, props: { ...props } });
    }
    return fields;
  }, [collection]);

  const handleChange = React.useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <Page name="collection">
      <List fields={fields} collection={collection} />
      <Data fields={fields} onChange={handleChange} />
    </Page>
  );
}
