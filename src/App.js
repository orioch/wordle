import "./css/App.css";
import Board from "./components/board";
import Keyboard from "./components/keyboard";
import React, { useCallback, useEffect, useState } from "react";
import {
  isWord,
  checkWord,
  arraysEqual,
  generateRandomWord,
  cloneArray,
} from "./utilitis/general";
import Modal from "./components/modal";
import { initialBoardArr, initialKeyBoardArr } from "./data/boards";
import Header from "./components/header";
import Message from "./components/message";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState({ open: false, text: "" });
  const [dailyWord, setDailyWord] = useState(generateRandomWord());
  const [currentWord, setCurrentWord] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [boardArr, setBoardArr] = useState(cloneArray(initialBoardArr));
  const [keyboardArr, setKeyboardArr] = useState(
    cloneArray(initialKeyBoardArr)
  );

  const handleKeydown = useCallback((e) => {
    handleClick(e.key);
  });
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  const changeColors = useCallback((colors) => {
    let newBoard = [...boardArr];
    let newKeyboard = [...keyboardArr];
    for (const index in colors) {
      newBoard = addToBoard(
        newBoard,
        colors[index],
        "color",
        currentWord,
        Number(index)
      );

      if (colors[index] === 3) {
        const key = boardArr[currentWord][index].text;
        const keyboardIndex = getKeyboardIndex(key);
        newKeyboard[keyboardIndex[0]][keyboardIndex[1]].color = 3;
      }
      if (colors[index] === 2) {
        const key = boardArr[currentWord][index].text;
        const keyboardIndex = getKeyboardIndex(key);
        if (newKeyboard[keyboardIndex[0]][keyboardIndex[1]].color !== 3)
          newKeyboard[keyboardIndex[0]][keyboardIndex[1]].color = 2;
      }
      if (colors[index] === 1) {
        const key = boardArr[currentWord][index].text;
        const keyboardIndex = getKeyboardIndex(key);
        if (
          newKeyboard[keyboardIndex[0]][keyboardIndex[1]].color !== 2 &&
          newKeyboard[keyboardIndex[0]][keyboardIndex[1]].color !== 3
        )
          newKeyboard[keyboardIndex[0]][keyboardIndex[1]].color = 1;
      }
    }
    setBoardArr(newBoard);
    setKeyboardArr(newKeyboard);
  });

  const getKeyboardIndex = (value) => {
    for (const keyI in keyboardArr) {
      for (const keyJ in keyboardArr[keyI]) {
        if (keyboardArr[keyI][keyJ].text === value) {
          return [keyI, keyJ];
        }
      }
    }
  };
  const addToBoard = (board, value, property, wordIndex, letterIndex) => {
    const newBoard = [
      ...board.slice(0, wordIndex),
      [
        ...board[wordIndex].slice(0, letterIndex),
        property === "text"
          ? {
              text: value,
              color: board[wordIndex][letterIndex].color,
            }
          : {
              text: board[wordIndex][letterIndex].text,
              color: value,
            },
        ...board[wordIndex].slice(letterIndex + 1, board[wordIndex].length),
      ],
      ...board.slice(wordIndex + 1, board.length),
    ];

    return newBoard;
  };

  const handleClick = (button) => {
    if (!gameOver) {
      button = button.toUpperCase();
      if (button.length === 1 && button.match(/[A-Z]/)) {
        if (currentLetter !== 5) {
          setBoardArr(
            addToBoard(boardArr, button, "text", currentWord, currentLetter)
          );
          setCurrentLetter((prevLetter) => prevLetter + 1);
        }
      }
      if (button === "ENTER") {
        if (currentLetter === 5) {
          if (isWord(boardArr[currentWord])) {
            changeColors(checkWord(boardArr[currentWord], dailyWord));

            if (
              currentWord === 5 &&
              !arraysEqual(
                checkWord(boardArr[currentWord], dailyWord),
                [3, 3, 3, 3, 3]
              )
            ) {
              setGameOver("0/6");
              openMoadl();
            }
            if (
              arraysEqual(
                checkWord(boardArr[currentWord], dailyWord),
                [3, 3, 3, 3, 3]
              )
            ) {
              setGameOver(currentWord + 1 + "/6");
              openMoadl();
            }
            setCurrentLetter(0);
            setCurrentWord((prevWord) => prevWord + 1);
          } else {
            sendMessage(
              boardArr[currentWord].map((letter) => letter.text).join("") +
                " is not a word"
            );
          }
        } else {
          sendMessage("not enough letters");
        }
      }
      if (button === "BACKSPACE") {
        if (currentLetter !== 0) {
          setBoardArr(
            addToBoard(boardArr, "", "text", currentWord, currentLetter - 1)
          );
          setCurrentLetter((prevLetter) => prevLetter - 1);
        }
      }
    }
  };

  const resetGame = () => {
    setDailyWord(generateRandomWord());
    setCurrentLetter(0);
    setCurrentWord(0);
    setBoardArr(cloneArray(initialBoardArr));
    setKeyboardArr(cloneArray(initialKeyBoardArr));
    setGameOver(false);
    setModalOpen(false);
  };

  const sendMessage = (text) => {
    if (!message.open) {
      setMessage({ open: true, text: text });
      setTimeout(() => {
        setMessage({ open: false, text: "" });
      }, 1500);
    }
  };

  const openMoadl = () => {
    setTimeout(() => {
      setModalOpen(true);
    }, 1000);
  };
  return (
    <div className="game">
      <Header />
      <Modal
        gameOver={gameOver}
        open={modalOpen}
        playAgain={resetGame}
        word={dailyWord}
      />
      <Message open={message.open}>{message.text}</Message>
      <Board array={boardArr} />
      <Keyboard array={keyboardArr} handleClick={handleClick} />
    </div>
  );
}

export default App;
