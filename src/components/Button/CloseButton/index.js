import * as React from "react";
// import "./style.css";
import { Close } from "../../Icons";

function CloseButton({ onClick, style }) {
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div
      data-testid="close_btn"
      role="button"
      tabIndex="0"
      onKeyPress={onClick}
      className="close_btn absolute opacity-25 duration-300 cursor-pointer"
      onClick={onClick}
      style={style}
    >
      {Close}
    </div>
  );
}

export default CloseButton;
