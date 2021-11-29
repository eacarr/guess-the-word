const guessedLettersElement = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const againBtn = document.querySelector(".play-again");
const highlight = document.querySelector(".highlight");
// const word = "magnolia";
const word = "b";
const guessedLetters = [];

// setting placeholders for each letter
const progressDot = (word) => {
  // empty array to hold the place holder dots
  const placeholder = [];
  // loop through word const and replace letters with dots
  for (let letters of word) placeholder.push("●");
  inProgress.innerText = placeholder.join("");
};
// call function
progressDot(word);

// Guess Button event
guessBtn.addEventListener("click", (e) => {
  e.preventDefault();
  guessMessage.innerText = "";
  const input = inputLetter.value;
  const inputResult = validatePlayerInput(input);
  // console.log(inputResult);
  makeGuess(inputResult);
});

// Validate the players input
const validatePlayerInput = (input) => {
  // asure only letters get selected
  const acceptedLetter = /[a-zA-Z]/;
  // asure the input box is not empty
  if (input.length === 0) {
    guessMessage.innerText = "Please input a letter.";
    // asure only one object in the input box
  } else if (input.length > 1) {
    guessMessage.innerText = "Please select only one letter.";
    // asuring input follows acceptedLetters
  } else if (!input.match(acceptedLetter)) {
    guessMessage.innerText = "Letters only please.";
    // input is valid and allowed to go through
  } else {
    return input;
  }
};

const makeGuess = (letter) => {
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    guessMessage.innerText = "You have already guessed that, try again.";
  } else {
    guessedLetters.push(letter);
    showGuessedLetters();
    updateInProgress(guessedLetters);
  }
  // console.log(guessedLetters);
};

const showGuessedLetters = () => {
  guessedLettersElement.innerText = "";
  for (let letter of guessedLetters) {
    let li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(letter);
  }
};

const updateInProgress = (guessedLetters) => {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  // console.log(wordArray);
  const updateWord = [];
  for (let letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updateWord.push(letter.toUpperCase());
    } else {
      updateWord.push("●");
    }
  }
  inProgress.innerText = updateWord.join("");
  checkIfWon();
};

const checkIfWon = () => {
  guessMessage.innerText = "";
  if (word.toUpperCase() === inProgress.innerText) {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
