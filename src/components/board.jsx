import React from "react";
import Square from "./square";

function Board({ array }) {
  return (
    <div className="board">
      {array.map((row, index) => (
        <Row key={index} array={row} />
      ))}
    </div>
  );
}

function Row({ array }) {
  return (
    <div className="row">
      {array.map((square, index) => (
        <Square key={index} square={square} />
      ))}
    </div>
  );
}

export default Board;
