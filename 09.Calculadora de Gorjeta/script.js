//outputs
const tip = document.querySelector(".tip");
const finalBill = document.querySelector(".finalBill");

//btn
const btnCalc = document.querySelector(".btnCalc");

btnCalc.addEventListener("click", () => {
    const billAmount = parseFloat(document.querySelector(".billAmount").value);
    const serviceQuality = parseFloat(document.querySelector(".serviceQuality").value);
    
    // Verifica se billAmount é um número válido
    if (isNaN(billAmount) || billAmount <= 0) {
        alert("Preencha o valor da conta corretamente!");
        return;
    }

    const tipOutput = billAmount * serviceQuality;
    tip.value = `R$ ${tipOutput.toFixed(2)}`;
    finalBill.value = `R$ ${(billAmount + tipOutput).toFixed(2)}`;
});
