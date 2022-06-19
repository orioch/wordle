import React, { useState, useEffect, useCallback } from "react";

function Square({ square }) {
  const [animationState, setAnimationState] = useState("static");

  //  flip the square by changing the animtionState every time square.color is changing
  useEffect(() => {
    setAnimationState("flip-part-1");
    setTimeout(() => {
      setAnimationState("flip-part-2");
      setTimeout(() => {
        setAnimationState("static");
      }, 400);
    }, 400);
  }, [square.color]);

  //  do the click animation by changing the animtionState every time square.text is changing
  useEffect(() => {
    if (square.text === "") {
      setAnimationState("static");
    } else {
      setTimeout(() => {
        setAnimationState("click");
        setTimeout(() => {
          setAnimationState("static-black");
        }, 50);
      }, 50);
    }
  }, [square.text]);

  // get a color number and return the style object
  const getColorObject = (color) => {
    switch (color) {
      case 0:
        return {
          backgroundColor: "white",
          color: "black",
          borderColor: "#b3b3b3",
        };
      case 1:
        return {
          background: "#616161",
          color: "white",
          borderColor: "#616161",
        };
      case 2:
        return {
          background: "#f1c232",
          color: "white",
          borderColor: "#f1c232",
        };
      case 3:
        return {
          background: "#6aa84f",
          color: "white",
          borderColor: "#6aa84f",
        };

      default:
        return {
          BackgroundColor: "white",
          color: "black",
          borderColor: "#b3b3b3",
        };
    }
  };

  //
  const getStyle = () => {
    let colorObject = getColorObject(square.color);

    if (animationState === "click") {
      return {
        border: "3px solid black",
        margin: "0px",
        backgroundColor: "white",
        color: "black",
      };
    }
    if (animationState === "static-black") {
      return {
        border: "2px solid black",

        backgroundColor: "white",
        color: "black",
      };
    }
    if (animationState === "static") {
      return colorObject;
    }

    if (animationState === "flip-part-1") {
      return {
        transform: "rotateX(90deg)",
        transition: "transform 0.4s",
        transformStyle: "preserve-3d",
        backgroundColor: "white",
        color: "black",
        borderColor: "black",
      };
    }
    if (animationState === "flip-part-2") {
      return Object.assign(colorObject, {
        transform: "rotateX(0deg)",
        transition: "transform 0.4s",
        transformStyle: "preserve-3d",
      });
    }
  };
  return (
    <div style={getStyle()} className="square">
      {square.text}
    </div>
  );
}

export default Square;
