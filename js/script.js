const guessedLetters = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guessMessages = document.querySelector(".messages");
const againBtn = document.querySelector(".play-again");

const word = "magnolia";

const progressDot = (word) => {
  const progressDotLetters = [];
  for (let dots of word) {
    console.log(dots);

    progressDotLetters.push("●");
  }
  inProgress.innerText = progressDotLetters.join("");
};
progressDot(word);

guessBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const guessVal = inputLetter.value;
  console.log(guessVal);
  inputLetter.value = "";
});
