//seleção de elementos
const input = document.querySelector("#input");
const start_uni = document.querySelector("#start_uni");
const final_uni = document.querySelector("#final_uni");
const output = document.querySelector("#output");
const btn = document.querySelector("#convert_btn");
const message = document.querySelector("#message");

//função de coversão
function convert(){
   if(start_uni.value === final_uni.value) {
    output.value = input.value;
    return;
   }

   let meters
   switch(start_uni.value){
    case "mm":
        meters = input.value / 1000;
        break;
    case "cm":
        meters = input.value / 100;
        break;
    case "dm":
        meters = input.value / 10;
        break;
    case "m":
        meters = input.value
        break;
    case "km":
        meters = input.value * 1000;
        break;
   }

   let result
   switch(final_uni.value){
    case "mm":
        result = meters * 1000;
        break;
    case "cm":
        result = meters * 100;
        break;
    case "dm":
        result = meters * 10;
        break;
    case "m":
        result = meters
        break;
    case "km":
        result = meters / 1000;
        break;
   }
   output.value = result
}

btn.addEventListener("click", convert);