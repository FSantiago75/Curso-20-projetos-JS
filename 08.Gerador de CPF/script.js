const CPF = document.querySelector(".CPF");
const btnGenerate = document.querySelector(".generate");
const btnCopy = document.querySelector(".copy");

btnGenerate.addEventListener("click", () => {
  //Geração de CPF válido e invalido:

  /*let newCPF = ""
    for(let i = 0; i< 3; i++){
        for(let i = 0; i< 3; i++){
        const number = Math.floor(Math.random() * 9);
        newCPF += number;
        }
        if (newCPF.length <10){
            newCPF += "."
        }
    }
    newCPF += "-"
    for(let i = 0; i< 2; i++){
        const number = Math.floor(Math.random() * 9);
        newCPF += number;
        }
    CPF.textContent = newCPF*/

  //Geração de CPF válido:
  let base = Math.floor(Math.random() * 999999999) + 1; //número base para cálculo
  let baseStr = base.toString().padStart(9, "0"); //adiciona 0 caso não alcance 9 chars
  let dv1 = calcDv(baseStr, 10); //cria digito 1
  let dv2 = calcDv(baseStr + dv1, 11); //cria digito 2
  newCPF = formatCpf(baseStr + dv1 + dv2); //formata
  CPF.textContent = newCPF; //imprime no elemento
});

const calcDv = (numero, peso) => {
  let total = 0;
  for (let i = 0; i < numero.length; i++) {
    total += parseInt(numero.charAt(i)) * peso--;
  }
  let resto = total % 11;
  return resto < 2 ? 0 : 11 - resto;
};

const formatCpf = (cpf) => {
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return cpf.replace(regex, "$1.$2.$3-$4");
};

btnCopy.addEventListener("click", () => {
  const cpf = CPF.innerText;
  navigator.clipboard.writeText(cpf);
  cpf != "" ? alert("Copiado para a área de transferência") : null;
});
