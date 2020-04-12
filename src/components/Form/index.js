import * as React from "react";
import isEmail from "validator/es/lib/isEmail";
import isAlpha from "validator/es/lib/isAlpha";
import isMobilePhone from "validator/es/lib/isMobilePhone";

// import './style.css';

const FieldContext = React.createContext();

function useForm() {
  const [fields, setFields] = React.useState({});
  const getFieldsValue = () => {
    const values = {};
    Object.keys(fields).forEach((key) => {
      values[key] = fields[key].value;
    });
    return values;
  };

  const setField = (name, fieldProps) => {
    const newField = {
      ...fields,
      [name]: fieldProps,
    };

    setFields(newField);
  };

  const getField = (name) => {
    return fields[name];
  };

  const setFieldValue = (name, value) => {
    if (!fields[name]) return;
    const newFields = fields;
    newFields[name].value = value;
    newFields[name].error = "";
    setFields({
      ...newFields,
    });
  };

  const initFieldsValue = () => {
    const newFields = fields;
    Object.keys(newFields).forEach((key) => {
      newFields[key].value = "";
    });
    setFields({
      ...newFields,
    });
  };

  const generateValidateFunc = (type) => {
    switch (type) {
      case "email": {
        return isEmail;
      }
      case "name": {
        return isAlpha;
      }
      case "phone": {
        return isMobilePhone;
      }
      default: {
        return false;
      }
    }
  };

  const validateFields = () => {
    let isError = false;
    const newFields = fields;
    Object.keys(newFields).forEach((key) => {
      if (newFields[key].rules) {
        newFields[key].rules.forEach((rule) => {
          // Pre-configured validation
          if (typeof rule === "object") {
            // Check if empty
            if (rule.required) {
              if (!newFields[key].value) {
                isError = true;
                newFields[key].error = rule.message;
                return;
              }
            }
            // Check if valid if not empty
            if (rule.type && newFields[key].value) {
              const validate = generateValidateFunc(rule.type);
              if (validate) {
                const result = validate(newFields[key].value);
                if (!result) {
                  isError = true;
                  newFields[key].error = rule.message;
                  return;
                }
              }
            }
          }
          // Custom validate functions
          if (typeof rule === "function") {
            const result = rule();
            if (result !== true) {
              isError = true;
              newFields[key].error = result;
            }
          }
        });
      }
    });
    setFields({
      ...newFields,
    });

    return !isError;
  };

  return {
    fields,
    getFieldsValue,
    setField,
    getField,
    setFieldValue,
    validateFields,
    initFieldsValue,
  };
}

function GroupItemWrapper({ children }) {
  return <div style={{ width: "48%" }}>{children}</div>;
}

function Group({ children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {React.Children.map(children, (child) => (
        <GroupItemWrapper>{child}</GroupItemWrapper>
      ))}
    </div>
  );
}

function FormItem({ children, name, rules }) {
  const contextValue = React.useContext(FieldContext);
  const { setField, fields, setFieldValue, getField } = contextValue;

  const handleOnchange = (e) => {
    setFieldValue(name, e.target.value);
  };
  const field = getField(name);

  const fieldProps = {
    value: field ? field.value : "",
    handleOnchange,
    error: "",
    rules,
  };

  React.useEffect(() => {
    if (name in fields) return;
    setField(name, fieldProps);
  });

  if (field) {
    return React.cloneElement(children, {
      value: field.value,
      error: field.error,
      handleOnchange,
    });
  }
  return null;
}

function FormWrapper({ children }) {
  return <div className="form">{children}</div>;
}

function Form({ children, form, title }) {
  return (
    <FieldContext.Provider value={form}>
      <FormWrapper>
        {title}
        {children}
      </FormWrapper>
    </FieldContext.Provider>
  );
}

export { Form, useForm, FormItem, Group };
