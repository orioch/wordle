import React from "react";
import "../css/modal.css";

function Modal({ gameOver, open, playAgain, word }) {
  const getText = () => {
    const text = Math.floor(Math.random() * 3);

    if (gameOver === "0/6") {
      let print = `The word was "` + word + '". ';
      switch (text) {
        case 0:
          return print + "Well, at least you tried.";
        case 1:
          return print + "Don't worry... maybe next time.";
        case 2:
          return print + "Bummer. but you can try again!";

        default:
          return print + "";
      }
    }

    if (gameOver.charAt(0) > 3) {
      switch (text) {
        case 0:
          return "Well, not bad at all.";
        case 1:
          return "You win,but you can do better.";
        case 2:
          return "Nice.";
        default:
          return "";
      }
    }

    if (gameOver.charAt(0) > 1) {
      switch (text) {
        case 0:
          return "Wow! Wow! Wow!";
        case 1:
          return "A - M - A - Z - I - N - G";
        case 2:
          return "A - M - A - Z - I - N - G";
        default:
          return "";
      }
    }

    switch (text) {
      case 0:
        return "Ok whhattttt??!!";
      case 1:
        return "one shot one kill!!!";
      case 2:
        return "No Way!";
      default:
        return "";
    }
  };

  if (open) {
    return (
      <>
        <div className="overlay"></div>
        <div className="modal">
          <div className="grade">{gameOver}</div>
          <div className="message">{getText()}</div>
          <button className="play-again" onClick={playAgain}>
            Play Again
          </button>
        </div>
      </>
    );
  } else return null;
}

export default Modal;
