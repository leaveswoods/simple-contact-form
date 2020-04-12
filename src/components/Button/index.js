import * as React from "react";
// import "./style.css";
import Loader from "../Loaders/ButtonLoader";

export default function Button({ onClick, loading, children, style }) {
  const outerBaseClass = "btn_outer";
  return (
    <div
      style={style}
      className={loading ? `${outerBaseClass} disabled` : outerBaseClass}
    >
      <div
        className="btn_inner"
        onClick={onClick}
        tabIndex="0"
        role="button"
        onKeyPress={onclick}
      >
        {loading ? <Loader /> : children}
      </div>
    </div>
  );
}
