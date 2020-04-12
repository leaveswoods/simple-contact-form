import * as React from "react";
import Alert from "../../Alert";

function ContactFormAlert({ alertMessageProps, setAlertVisible }) {
  const executeOnClose = () => {
    setAlertVisible(false);
  };
  return (
    <Alert
      onClose={executeOnClose}
      message={alertMessageProps.message}
      type={alertMessageProps.type}
    />
  );
}

export default ContactFormAlert;
