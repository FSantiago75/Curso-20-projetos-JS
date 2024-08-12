const previous_btn = document.querySelector(".previous-btn")
const next_btn = document.querySelector(".next-btn")
const progress_bar = document.querySelector(".progress")
const tela1 = document.querySelector(".tela_inicial")
const tela2 = document.querySelector(".tela_final")
const btn_tela = document.querySelector(".btn-voltar-tela")
let progress = 0;

//função de disable dos btns
const disable = (btn, time) =>{
    btn.disabled = true;
    setTimeout(()=>{
        btn.disabled = false;
    }, time);
};

//Avanço e retorno da barra
previous_btn.addEventListener("click", () =>{
    disable(previous_btn, 500);
    progress -= 25;
    if (progress < 0) progress = 0;
    progress_bar.style.width = progress + "%"
})
next_btn.addEventListener("click", () =>{
    disable(next_btn, 500);
    progress += 25;
    if (progress >= 100) progress = 100, tela1.style.display = "none",  tela2.style.display = "block";
    progress_bar.style.width = progress + "%"

})

//Voltar para a primeira tela
btn_tela.addEventListener("click", ()=>{
    tela2.style.display = "none",  tela1.style.display = "block";
    progress = 0;
    progress_bar.style.width = progress + "%"

})
    



