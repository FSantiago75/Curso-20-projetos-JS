const input = document.querySelector("#word");
const btnSend = document.querySelector(".btn-send");
const result = document.querySelector(".result");

const VerifyPalindrome = () => {
  const word = input.value;
  const reversedWord = word.split("").reverse().join("");
  if (word.toLowerCase() === reversedWord.toLowerCase()) {
    result.textContent = `A palavra "${word}" é um palíndromo`;
  } else {
    result.textContent = `A palavra "${word}" não é um palíndromo`;
  }
  input.value = "";
};

btnSend.addEventListener("click", () => {
  VerifyPalindrome();
});

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    VerifyPalindrome();
  }
});
