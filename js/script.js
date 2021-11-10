const guessedLettersElement = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const againBtn = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// setting placeholders for each letter
const progressDot = (word) => {
  const progressDotLetters = [];
  for (let dots of word) {
    console.log(progressDotLetters);
    progressDotLetters.push("●");
  }
  inProgress.innerText = progressDotLetters.join("");
};
progressDot(word);

// guess button event listener
guessBtn.addEventListener("click", (e) => {
  // used to prevent page from refreshing
  e.preventDefault();
  guessMessage.innerText = "";

  const guess = inputLetter.value;
  const goodGuess = validInput(guess);
  // console.log(goodGuess);
  if (goodGuess) {
    makeGuess(guess);
  }
  inputLetter.value = "";
});

// validate player's input
const validInput = (input) => {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    guessMessage.innerText = "Please enter letter.";
  } else if (input.length > 1) {
    guessMessage.innerText = "Only one letter please!!";
  } else if (!input.match(acceptedLetter)) {
    guessMessage.innerText = "Please enter a letter between A and Z.";
  } else {
    return input;
  }
};

// capture player's input
const makeGuess = (guess) => {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    guessMessage.innerText = "Already guessed that, try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
