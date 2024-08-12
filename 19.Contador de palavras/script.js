const inputTextElement = document.querySelector("#text-input");
const counterTextElement = document.querySelector(".counter");
const titleElement = document.querySelector(".title");
const buttonCountElement = document.querySelector(".button-count");

let currentService = "words";

buttonCountElement.addEventListener("click", () => {
  if (currentService === "words") {
    currentService = "chars";
    titleElement.textContent = "Contador de caracteres";
    buttonCountElement.textContent = "Contar palavras";
    CountText();
  } else if (currentService === "chars") {
    currentService = "words";
    titleElement.textContent = "Contador de palavras";
    buttonCountElement.textContent = "Contar caracteres";
    CountText();
  }
});

function CountText() {
  if (currentService === "chars") {
    counterTextElement.textContent = `${inputTextElement.value.length} Caractere(s)`;
  } else if (currentService === "words") {
    const words = inputTextElement.value.trim().split(/\s+/g)
    counterTextElement.textContent = `${words.length} Palavra(s)`;
    inputTextElement.value.trim() === ""? counterTextElement.textContent = "0 Palavra(s)" : counterTextElement.textContent = `${words.length} Palavra(s)`;
  } else {
    return;
  }
}

inputTextElement.addEventListener("keyup", () => {
  CountText();
});

window.addEventListener("keyup", (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    buttonCountElement.click();
  }
  CountText();
});
