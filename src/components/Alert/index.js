import * as React from "react";
// import "./style.css";
import CloseButton from "../Button/CloseButton";

function Alert({ message, onClose, type }) {
  let className = "alert";

  if (type === "success") {
    className += " success";
  } else if (type === "error") {
    className += " error";
  }

  return (
    <div
      className="alert_wrapper relative text-left mb-2"
      data-testid="form_alert"
    >
      <div className={className}>{message}</div>
      <CloseButton
        onClick={onClose}
        style={{
          right: 13,
          top: 20,
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}

export default Alert;
