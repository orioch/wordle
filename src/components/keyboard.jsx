import React from "react";
import Button from "./button";

function Keyboard({ array, handleClick }) {
  return (
    <div className="keyboard">
      {array.map((row, index) => (
        <Row key={index} array={row} handleClick={handleClick} />
      ))}
    </div>
  );
}

function Row({ array, handleClick }) {
  return (
    <div className="row">
      {array.map((button, index) => (
        <Button key={index} button={button} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default Keyboard;
