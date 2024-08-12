const btn_generate = document.querySelector(".btn-generate")
const colors = document.querySelector(".colors")
const Numbercolors = document.querySelector("#NumberColor")

btn_generate.addEventListener("click", ()=>{
    if (validateNumber()){
        //Geração
        colors.innerHTML = ""; //limpas as divs
        Numbercolors.parentElement.classList.remove("error");
        const MensagemErro = Numbercolors.nextElementSibling
        MensagemErro.style.display = "none"
        for(let i = 0; i < Numbercolors.value; i++){
            const color = RandomColor();
            const newDiv = document.createElement("div");
            newDiv.style.backgroundColor = color
            const newName = document.createElement("p")
            newName.textContent = color;
            newName.style.color = color;
            colors.appendChild(newDiv);
            newDiv.appendChild(newName)

        }
    }
    else{
        Numbercolors.parentElement.classList.add("error");
        const MensagemErro = Numbercolors.nextElementSibling
        MensagemErro.style.display = "block"
    }
    
})

const RandomColor = () =>{
    const letters = "0123456789ABCDEF";
    let color = "#";
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random ()*16)]
    }
    return color;
}

const validateNumber = () =>{
    if (Numbercolors.value > 8){
        return false;
    }
    else{
        return true;
    }
}

