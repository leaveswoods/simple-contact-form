import React, { useState } from "react";
import { render } from "react-dom";
import ContactForm from "../../src/components/ContactForm";
// Demo
function App() {
  const [loading, setLoading] = useState(false);
  const [alertMessageProps, setAlertMessageProps] = useState({
    message: "",
    type: "",
  });

  const mockAsync = () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setAlertMessageProps({
          message: "You message has been sent",
          type: "success",
        });
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <ContactForm
      fields={[
        { type: "nameGroup", required: true },
        { type: "phone", required: true },
        { type: "email", required: true },
        { type: "message", required: true },
      ]}
      loading={loading}
      submitButtonProps={{
        text: "Submit new",
      }}
      alertMessageProps={alertMessageProps}
      onSubmit={mockAsync}
    />
  );
}

render(<App />, document.getElementById("root"));
