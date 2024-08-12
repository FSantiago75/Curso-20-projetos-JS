const form = document.querySelector("form")
const nameElement = document.querySelector("#name")
const emailElement = document.querySelector("#email")
const passwordElement = document.querySelector("#password")
const confirmPasswordElement = document.querySelector("#confirm-password")
const messages = document.querySelectorAll(".message")

// Ao pressionar o btn de envio, ele aguarda pelas validações antes de enviar
form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateInputs();
})

// Pega o elemento seguinte a input adicionada ao parâmetro, troca seu texto pelo texto de erro e adiciona a classe de "error" no elemento pai para ocorrer alterações de estilo.
const setError = (input, errorText) => {
    const ElementoErrado = input.nextElementSibling;
    ElementoErrado.textContent = errorText;
    input.classList.add("error")
}

// Pega o elemento seguinte a input adicionada ao parâmetro, remove seu texto de erro e remove a classe de "error" no elemento pai.
const removeError = (input) => {
    const ElementoErrado = input.nextElementSibling;
    ElementoErrado.textContent = "";
    input.classList.remove("error")
}

// Utilizando uma expressão regular, essa função retorna se há os caracteres do Regex dentro do parâmetro
const validateExpressions = (input, type) => {
    if (type === "chars") {
        return /[*+!@#$%&(){}\[\]]|\d/.test(input);
    } else if (type === "email") {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/.test(input);
    }
}

const validateInputs = () => {
    // Novos valores salvos sem espaço utilizando o .trim()
    const nameValue = nameElement.value.trim()
    const emailValue = emailElement.value.trim()
    const passwordValue = passwordElement.value.trim()
    const confirmPasswordValue = confirmPasswordElement.value.trim()

    // Validações nome
    if (nameValue === "") {
        setError(nameElement, "Nome deve ser preenchido!")
    } else if (nameValue.length > 26) {
        setError(nameElement, "Nome deve ser menor!")
    } else if (validateExpressions(nameValue, "chars")) {
        setError(nameElement, "Nome não deve conter esses caracteres!")
    } else {
        removeError(nameElement)
    }

    // Validações e-mail
    if (emailValue === "") {
        setError(emailElement, "E-mail deve ser preenchido!")
    } else if (!validateExpressions(emailValue, "email")) {
        setError(emailElement, "E-mail não reconhecido!")
    } else {
        removeError(emailElement)
    }

    // Validações senha
    if (passwordValue === "") {
        setError(passwordElement, "Senha deve ser preenchida!")
    } else {
        removeError(passwordElement)
    }

    // Validações confirmação de senha
    if (confirmPasswordValue === "") {
        setError(confirmPasswordElement, "Confirmação de senha deve ser preenchida!")
    } else if (passwordValue !== confirmPasswordValue) {
        setError(confirmPasswordElement, "As senhas não coincidem!")
    } else {
        removeError(confirmPasswordElement)
    }
}

// Remove validação de erro ao começar a digitar
passwordElement.addEventListener("input", () => {
    removeError(passwordElement);
});

confirmPasswordElement.addEventListener("input", () => {
    removeError(confirmPasswordElement);
});
