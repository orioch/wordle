import { wordsArray } from "../data/wordsArray";
import { commonWords } from "../data/commonWords";

export const isWord = (word) => {
  const string = word
    .map((letter) => letter.text)
    .join("")
    .toLowerCase();
  return wordsArray.includes(string);
};

export const checkWord = (word, dailyWord) => {
  const string = word
    .map((letter) => letter.text)
    .join("")
    .toLowerCase();
  let alredyChecked = [false, false, false, false, false];
  let colors = [1, 1, 1, 1, 1];
  //green check
  for (const i in string) {
    if (string[i] === dailyWord[i]) {
      alredyChecked[i] = true;
      colors[i] = 3;
    }
  }
  //orange check
  for (const i in string) {
    for (const j in dailyWord) {
      if (colors[i] !== 3 && string[i] === dailyWord[j] && !alredyChecked[j]) {
        colors[i] = 2;
        alredyChecked[j] = true;
      }
    }
  }
  return colors;
};

export function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function generateRandomWord() {
  const number = Math.floor(Math.random() * commonWords.length);
  return commonWords[number];
}

export function cloneArray(array) {
  return JSON.parse(JSON.stringify(array));
}
