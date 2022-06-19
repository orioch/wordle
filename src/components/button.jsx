import React from "react";
import { Icon } from "@iconify/react";

function Button({ button, handleClick }) {
  const getStyle = (color) => {
    switch (color) {
      case 0:
        return { backgroundColor: "#dadada", color: "black" };
      case 1:
        return { background: "#616161", color: "white" };
      case 2:
        return { background: "#f1c232", color: "white" };
      case 3:
        return { background: "#6aa84f", color: "white" };

      default:
        return { BackgroundColor: "white", color: "black" };
    }
  };
  return (
    <div
      style={getStyle(button.color)}
      onClick={() => handleClick(button.text)}
      className="button"
    >
      {button.text === "BACKSPACE" ? (
        <Icon icon="bi:backspace" width="25" />
      ) : (
        button.text
      )}
    </div>
  );
}

export default Button;
