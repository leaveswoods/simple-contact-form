import * as React from "react";
import Button from "../../Button";

function SubmitButton({ loading, handleClickSubmit, text, style }) {
  return (
    <Button loading={loading} onClick={handleClickSubmit} style={style}>
      {text}
    </Button>
  );
}

export default SubmitButton;
