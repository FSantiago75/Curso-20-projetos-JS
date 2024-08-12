const selectionBox = document.querySelector(".selection-container");
const GameBox = document.querySelector(".game-container");
const selectDifficult = document.querySelector(".select-difficult");
const answerInput = document.querySelector(".input-number");
const answerInput_btn = document.querySelector(".send-answer");
const message = document.querySelector(".message");
const attempts = document.querySelector(".attempts");
const playAgain_btn = document.querySelector(".play-again");
const inputBox = document.querySelector(".input-box");

let maxTries;
let randomNumber;
let triesLeft;

selectDifficult.addEventListener("change", () => {
  const difficult = selectDifficult.value;
  switch (difficult) {
    case "none":
      break;
    case "F":
      maxTries = 10;
      break;
    case "M":
      maxTries = 7;
      break;
    case "D":
      maxTries = 5;
      break;
    default:
      maxTries = 10;
      break;
  }
  randomNumber = Math.floor(Math.random() * 100) + 1;
  triesLeft = maxTries;
  attempts.textContent = `Tentativas estantes: ${triesLeft}`;
  selectionBox.style.display = "none";
  GameBox.style.display = "block";
  inputBox.style.display = "block";
});

answerInput_btn.addEventListener("click", () => {
  const number = answerInput.value;
  if (isNaN(number) || number < 1 || number > 100) {
    message.textContent = "Insira um valor numérico de 1-100 válido!";
    return;
  }
  
  triesLeft--;
  if (number < randomNumber) {
    message.textContent = "Muito baixo. Tente novamente!";
  } else if (number > randomNumber) {
    message.textContent = "Muito alto. Tente novamente!";
  } else if (number == randomNumber) {
    message.textContent = "Você acertou! Vamos jogar outra?";
    inputBox.style.display = "none";
    playAgain_btn.style.display = "block";
  }
  updateAttempts(triesLeft);

  if(triesLeft < 1){
    message.textContent = `Você perdeu! O número era ${randomNumber}. Vamos jogar outra?`;
    inputBox.style.display = "none";
    playAgain_btn.style.display = "block";
  }
});

const updateAttempts = (input) => {
  attempts.textContent = `Tentativas estantes: ${input.toString()}`;
};

playAgain_btn.addEventListener("click", () => {
  message.textContent = "";
  answerInput.value = "";
  GameBox.style.display = "none";
  playAgain_btn.style.display = "none";
  selectionBox.style.display = "block";
  inputBox.style.display = "none";
});
