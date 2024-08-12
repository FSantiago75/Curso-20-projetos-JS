function updateElement(){
const clock = document.querySelector(".clock");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

const date = new Date();
hours.textContent = date.getHours().toString().padStart(2, "0");
minutes.textContent = date.getMinutes().toString().padStart(2, "0");
seconds.textContent = date.getSeconds().toString().padStart(2, "0");
}
setInterval(updateElement, 1000);
