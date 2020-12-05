import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./rich-text.scss";
import { DataContext } from "../../data";
import Field from "../../field/field";

export default function RichText({ name, ...props }) {
  const { setField } = React.useContext(DataContext);

  const handleChange = React.useCallback(
    (content, editor) => {
      setField(name, content);
    },
    [name]
  );

  return (
    <Field type="rich-text">
      <Field.Label>{name}</Field.Label>
      <Editor
        className="editor"
        apiKey={process?.env?.REACT_APP_TINY_MCE_KEY}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic superscript subscript | forecolor backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | image | removeformat | help",
        }}
        onEditorChange={handleChange}
      />
    </Field>
  );
}
