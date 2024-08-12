const popUp = document.querySelector(".pop-up");
const cancelButton = document.querySelector(".cancel-button");
const exitButton = document.querySelector(".exit-button");
let popUpFlag = false;

document.addEventListener("mouseout", function (event) {
  if (event.relatedTarget === null && !localStorage.getItem("popUpDisplayed")) {
    popUp.style.display = "block";
  }
});

cancelButton.addEventListener("click", () => {
  popUp.style.display = "none";
  localStorage.setItem("popUpDisplayed", true);
});
exitButton.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.go(-1);
  } else {
    window.close();
  }
});
