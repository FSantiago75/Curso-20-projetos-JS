const openPasswordElement = document.querySelector(".open-password");
const generatedPasswordBox = document.querySelector(".generated-password-box");
const formProfile = document.querySelector(".register-form");
const openCustomPasswordBox = document.querySelector(".open-custom-password-box");
const openCustomPassword = document.querySelector(".open-custom-password");
const customPasswordBox = document.querySelector(".generate-options");
const GenerateCustomPasswordBtn = document.querySelector(".generate-custom-password");
const lengthValue = document.querySelector("#length");
const lettersValue = document.querySelector("#letters");
const numbersValue = document.querySelector("#numbers");
const symbolsValue = document.querySelector("#symbols");

// Funções de geração de senha
const GetLetterLowerCase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const GetLetterUpperCase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const GetNumber = () => Math.floor(Math.random() * 10);
const GetSymbol = () => {
  const symbols = "!@#$&*/|";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Geração da primeira senha sem personalização
const GenerateFirstPassword = () => {
  let password = "";
  const passwordLength = 8; // Mantido como número

  const generatorFunctions = [GetLetterLowerCase, GetLetterUpperCase, GetNumber, GetSymbol];
  for (let i = 0; i < passwordLength; i++) {
    const randomValue = generatorFunctions[Math.floor(Math.random() * generatorFunctions.length)]();
    password += randomValue;
  }
  return password;
};

// Geração Customizada
const GenerateCustomPassword = () => {
  let password = "";
  const passwordLength = parseInt(lengthValue.value, 10); // Convertendo para número

  let generatorFunctions = [];
  if (passwordLength <= 15 && passwordLength >= 5) {
    if (lettersValue.checked) {
      generatorFunctions.push(GetLetterLowerCase);
      generatorFunctions.push(GetLetterUpperCase);
    }
    if (numbersValue.checked) {
      generatorFunctions.push(GetNumber);
    }
    if (symbolsValue.checked) {
      generatorFunctions.push(GetSymbol);
    }
    if (generatorFunctions.length === 0) {
      ChangeTextCustomPassword("Assinale pelo menos uma opção!");
      return "";
    }
    for (let i = 0; i < passwordLength; i++) {
      const randomValue = generatorFunctions[Math.floor(Math.random() * generatorFunctions.length)]();
      password += randomValue;
    }
    generatedPasswordBox.querySelector("p").textContent = "Aperte para copiar!";
    return password;
  } else if (passwordLength > 15) {
    ChangeTextCustomPassword("Senha máxima de 15 caracteres");
    return "";
  } else if (passwordLength < 5) {
    ChangeTextCustomPassword("Senha deve conter pelo menos 5 caracteres");
    return "";
  } else {
    return "";
  }
};

function ChangeTextCustomPassword(text) {
  generatedPasswordBox.querySelector("p").textContent = text;
  setTimeout(() => {
    generatedPasswordBox.querySelector("p").textContent = "Gere sua senha!";
  }, 5000);
}

// Evento para gerar a senha customizada
GenerateCustomPasswordBtn.addEventListener("click", () => {
  generatedPasswordBox.querySelector("h4").textContent = GenerateCustomPassword();
});

// Evento para gerar a primeira senha
openPasswordElement.addEventListener("click", () => {
  generatedPasswordBox.querySelector("h4").textContent = GenerateFirstPassword();
  generatedPasswordBox.style.display = "block";
  openCustomPasswordBox.style.display = "block";
});

// Evento para liberar a customização de senha
openCustomPassword.addEventListener("click", () => {
  customPasswordBox.style.display = "block";
  generatedPasswordBox.querySelector("p").textContent = "Gere sua senha!";
  generatedPasswordBox.querySelector("h4").textContent = "";
});

// Evento para copiar a senha e fechar a box
generatedPasswordBox.querySelector("h4").addEventListener("click", () => {
  navigator.clipboard.writeText(generatedPasswordBox.querySelector("h4").textContent);
  generatedPasswordBox.style.display = "none";
  openCustomPasswordBox.style.display = "none";
  customPasswordBox.style.display = "none";
});
