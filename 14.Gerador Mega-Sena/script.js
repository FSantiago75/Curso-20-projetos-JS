const numbers = document.querySelectorAll(".number");
const generateNumbers = document.querySelector(".generate-numbers");
generateNumbers.addEventListener("click", () => {
  const verifyNumbers = [];
  numbers.forEach((e) => {
    let getNumbers = Math.floor(Math.random() * 60) + 1;
    if (!verifyNumbers.includes(getNumbers)) {
      verifyNumbers.push(getNumbers);
    } else {
      while (verifyNumbers.includes(getNumbers)) {
        getNumbers = Math.floor(Math.random() * 60) + 1;
      }
      verifyNumbers.push(getNumbers);
    }
  });
  console.log(verifyNumbers);
  for (let i = 0; i < verifyNumbers.length; i++) {
    numbers[i].textContent = verifyNumbers[i];
  }
});
