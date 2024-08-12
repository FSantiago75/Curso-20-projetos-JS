const form = document.querySelector("form")
const nome = document.querySelector("#nome")
const email = document.querySelector("#email")
const assunto = document.querySelector("#assunto")
const mensagem = document.querySelector("#mensagem")
const btn_envia = document.querySelector(".btn-envia")
const mensagens_erro = document.querySelectorAll(".mensagem_erro")

//Ao pressionar o btn de envio, ele aguarda pelas validações antes de enviar
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    validateInputs()
})

//pega o elemento seguinte a input adicionada ao parâmetro, troca seu texto pelo texto de erro e adiciona a classe de "error" no elemento pai para ocorrer alterações de estilo.
const setError = (input, errorText) =>{
    const ElementoErrado = input.nextElementSibling;
    ElementoErrado.textContent = errorText;
    input.parentElement.classList.add("error")
}

//pega o elemento seguinte a input adicionada ao parâmetro, remove seu texto de erro e remove a classe de "error" no elemento pai.
const removeError = (input) =>{
    const ElementoErrado = input.nextElementSibling;
    ElementoErrado.textContent = "";
    input.parentElement.classList.remove("error")
}

//Utilizando uma expressão regular, essa função retorna se há os caracteres do Regex dentro do parâmetro
const validateExpressions = (input, type)=>{     
    if (type === "chars"){
        return /[*+!@#$%&(){}\[\]]|\d/.test(input);
    
    }
    else if (type === "email"){
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/.test(input);
    }
}

const validateInputs = () =>{
    //Novos valores salvos sem espaço utilizando o .trim()
    const nomeValue = nome.value.trim()
    const emailValue = email.value.trim()
    const assuntoValue = assunto.value.trim()
    const mensagemValue = mensagem.value.trim()


    //Validações nome
    if(nomeValue === ""){
        setError(nome, "Nome deve ser preenchido!")
    }
    else if (nomeValue.length > 26){
        setError(nome, "Nome deve ser menor!")
    }
    else if (validateExpressions(nomeValue, "chars")){
        setError(nome, "Nome não deve conter esses carcteres!")
    }
    else{
        removeError(nome)
    }
    //Validações e-mail
    if(emailValue === ""){
        setError(email, "E-mail deve ser preenchido!")
    }
    else if(!validateExpressions(emailValue, "email")){
        setError(email, "E-mail não reconhecido!")
    }
    else{
        removeError(email)
    }

    //Validações assunto
    if(assuntoValue === ""){
        setError(assunto, "Assunto deve ser preenchido!")
    }
    else{
        removeError(assunto)
    }
    //Validações mensagem
    if(mensagemValue === ""){
        setError(mensagem, "Mensagem deve ser preenchida!")
    }
    else{
        removeError(mensagem)
    }
}

