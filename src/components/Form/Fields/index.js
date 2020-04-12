import * as React from "react";
// import "./style.css";

function ErrorMessage({ error }) {
  return (
    <div
      data-testid="form_field_error_message"
      className="error_message text-red-500 absolute text-sm"
    >
      {error}
    </div>
  );
}

function InputField({ value, handleOnchange, error, placeholder }) {
  return (
    <div className="input_item">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleOnchange}
        value={value}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
}

function TextField({ value, handleOnchange, placeholder, rows, error }) {
  return (
    <div className="input_item">
      <textarea
        onChange={handleOnchange}
        value={value}
        placeholder={placeholder}
        rows={rows}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
}

export { InputField, TextField };
