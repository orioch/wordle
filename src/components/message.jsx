import React from "react";
import "../css/modal.css";

function Message(props) {
  if (props.open) {
    return <div className="message">{props.children}</div>;
  } else return null;
}

export default Message;
