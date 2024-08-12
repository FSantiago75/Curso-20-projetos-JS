const backToTop = document.querySelector(".back-to-top")
const elements = document.querySelectorAll("nav a")


window.addEventListener("scroll", () =>{
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset // para navegadores mais velhos
    console.log(scrollTop)
    if (scrollTop > 300){
        backToTop.style.display = "block"
    }
    else{
        backToTop.style.display = "none"
    }
})

backToTop.addEventListener("click", ()=>{
   window.scrollTo({top: 0, behavior:"smooth"})
})

elements.forEach(drop =>{
        drop.addEventListener("click", function(e){
            e.preventDefault()
            const element = this.textContent
            if (element === "Home"){
                window.scrollTo({top: 0, behavior:"smooth"})
            }
            if (element === "Sobre"){
                window.scrollTo({top: 870, behavior:"smooth"})
            }
            if (element === "Produto"){
                window.scrollTo({top: 1730, behavior:"smooth"})
            }
            if (element === "Produto 1"){
                window.scrollTo({top: 2590, behavior:"smooth"})
            }
            if (element === "Produto 2"){
                window.scrollTo({top: 3450, behavior:"smooth"})
            }
            if (element === "Subproduto 1"){
                window.scrollTo({top: 4275, behavior:"smooth"})
            }
            if (element === "Subproduto 2"){
                window.scrollTo({top: 5100, behavior:"smooth"})
            }
            if (element === "Contato"){
                window.scrollTo({top: 5930, behavior:"smooth"})
            }
        })
})
