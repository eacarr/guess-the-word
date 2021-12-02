const guessedLettersElement = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const guessMessage = document.querySelector(".message");
const againBtn = document.querySelector(".play-again");
const highlight = document.querySelector(".highlight");

let word = "";
// const word = "boy";
let guessedLetters = [];
let remainingGuesses = 8;

// async function
const getWord = async () => {
  const wordRequest = await fetch(
    `https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`
  );
  const words = await wordRequest.text();
  // console.log(data);
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);

  // call word variable
  word = wordArray[randomIndex].trim();

  progressDot(word);
  console.log(word);
};

// setting placeholders for each letter

const progressDot = (word) => {
  // empty array to hold the place holder dots
  const placeholder = [];
  // loop through word const and replace letters with dots
  for (let letters of word) placeholder.push("●");
  inProgress.innerText = placeholder.join("");
};
// call function
getWord();

// Guess Button event
guessBtn.addEventListener("click", (e) => {
  e.preventDefault();
  guessMessage.innerText = "";
  let input = inputLetter.value;
  const inputResult = validatePlayerInput(input);
  // console.log(inputResult);
  makeGuess(inputResult);
  inputLetter.value = "";
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
    // console.log(guessMessage.innerText);
  } else {
    guessedLetters.push(letter);
    showGuessedLetters();
    countGuessRemain(letter);
    updateInProgress(guessedLetters);
  }
  console.log(guessedLetters);
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

// guess count down
const countGuessRemain = (guess) => {
  // guessMessage.innerText = "";

  const wordUpper = word.toUpperCase();
  if (!wordUpper.includes(guess)) {
    console.log(true);
    guessMessage.textContent = "Not the right letter.";
    remainingGuesses--;
    remainingSpan.textContent = `${remainingGuesses} guesses`;
    if (remainingGuesses < 1) {
      guessMessage.textContent = `You've lost. The correct answer was ${word.toUpperCase()}`;
      startOver();
    }
    console.log(guessMessage.textContent);
  } else {
    console.log(false);
    guessMessage.textContent = "Letter is in the word.";

    console.log(guessMessage.textContent);
  }
};

// check if player won
const checkIfWon = () => {
  if (word.toUpperCase() === inProgress.innerText) {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};

const startOver = () => {
  againBtn.classList.remove("hide");
  guessBtn.classList.add("hide");
  remaining.classList.add("hide");
  guessedLettersElement.classList.add("hide");
};

againBtn.addEventListener("click", () => {
  guessMessage.classList.remove("win");
  guessMessage.textContent = "";
  guessedLettersElement.textContent = "";
  remainingSpan.textContent = "8 guesses";
  remainingGuesses = 8;
  guessedLetters = [];
  againBtn.classList.add("hide");
  guessBtn.classList.remove("hide");
  remaining.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  getWord();
  inputLetter.value = "";
});
