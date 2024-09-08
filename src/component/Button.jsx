import React from "react";

const Button = ({ borderr, setState, changeTo, text }) => {
  return (
    <>
      {changeTo ? (
        <button
          style={{ cursor: "pointer" }}
          className={`custom-button ${text == "signingup" && "loader"} ${borderr}`}
          onClick={() => setState(changeTo)}
        >
          {text == "signingup" ? "" : text}
        </button>
      ) : (
        <button
          style={{ cursor: "pointer" }}
          className={`custom-button ${text == "signing" && "loader"} ${borderr}`}
        >
          {text == "signing" ? "" : text}
        </button>
      )}
    </>
  );
};

export default Button;
