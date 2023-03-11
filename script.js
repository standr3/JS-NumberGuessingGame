"use-strict";

let tries = [];
let gameOver = false;
let secretNumber = -1;

const RNG = () => Math.trunc(Math.random() * 20) + 1;
const isGuessCorrect = (g) => g === secretNumber;
const MAX = (a,b) => a > b ? a : b;
const displayGuess = (n) => (document.querySelector(".number-guessed").textContent = n);
const setCurrentScore = (s) => (document.querySelector(".score").textContent = s);
const getCurrentScore = () => Number(document.querySelector(".score").textContent);
const setHighscore = (s) => (document.querySelector(".highscore").textContent = s);
const getHighscore = () => (document.querySelector(".highscore").textContent);
const modifyScoreBy = (setter, amount) => setter(amount);
const setMessage = (m) => (document.querySelector(".message").textContent = m);
const clearInput = () => document.querySelector(".guess").value="";
const inRange = (n) => n >= 1 && n <= 20;
const resetGame = function() {
  document.querySelector("body").style.backgroundColor = "#222";
  gameOver=false;
  tries = [];
  secretNumber = RNG();
  setMessage("Start guessing...");
  setCurrentScore(10);
  displayGuess('?');
  clearInput();

}

setHighscore(0);
resetGame();

const winGame = function() {
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number-guessed").style.width = "30rem";
  gameOver = true;
  setMessage("🎉 Correct guess!");
  modifyScoreBy(setHighscore,  MAX(getHighscore(), getCurrentScore()));
}

const checkGuess = function () {
  if (!gameOver){
    console.log(secretNumber);
    const guessed = Number(document.querySelector(".guess").value);
    if (guessed === NaN) {
      setMessage("❗ Input a valid number ❗");
    } else if (!inRange(guessed)) {
      setMessage("❗ Input is not in range ❗");
    } else {
      displayGuess(guessed);

      if (isGuessCorrect(guessed)) {
        winGame();
      } else if (tries.includes(guessed)) {
        setMessage("🤣 Already tried that one!");
      } else {
        tries.push(guessed);
        modifyScoreBy(setCurrentScore, getCurrentScore() - 1);
        if (getCurrentScore() === 0) {
          gameOver = true;
          setMessage("🙀 Out of guesses. Try again?");
        }
        else if (guessed < secretNumber) {
          setMessage("📉 Too low!");
        } else {
          setMessage("📈 Too high!");
        }

      }
    }
    clearInput();
  } else {
    clearInput();
    alert("Press Again! to try another round");
  }
};

document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".guess").addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkGuess();
});


document.querySelector(".again").addEventListener("click", resetGame);




