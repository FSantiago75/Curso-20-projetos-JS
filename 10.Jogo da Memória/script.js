const cards = [1, 1, 2, 2, 3, 3, 4, 4]; // Gera uma matriz de 8 cartas com 4 pares

let flippedCards = 0;
let firstCard, secondCard;
let attempts = 0;

const congratsDiv = document.querySelector(".congrats-div");

// Função para criar e embaralhar as cartas
async function createCards() {
  const imagePairs = await generateImagePairs(); // Espera as fotos serem geradas para dar uma leve sincronia nessas duas funções assíncronas
  shuffleCards(cards); // Embaralha com a função anterior
  const typeImage = document.querySelector(".imageSelect").value;
  const cardList = document.querySelector(".game"); // Pega a div que armazena os cards
  cardList.innerHTML = "";
  
  for (let i = 0; i < cards.length; i++) {
    // For loop que percorre os 8 cards novamente
    const card = document.createElement("div"); // Cria div principal do card
    const cardBack = document.createElement("div"); // Cria verso
    const cardFront = document.createElement("div"); // Cria frente

    card.classList.add("card"); // Adiciona classe de "card" ao novo elemento de carta
    cardBack.classList.add("back"); // Adiciona classe de "back" ao novo elemento de verso de "card"
    cardFront.classList.add("front"); // Adiciona classe de "front" ao novo elemento da frente de "card"

    cardBack.style.backgroundImage = `url(Assets/card-back${typeImage}.png)`;

    const cardNumber = cards[i];
    const cardImage = imagePairs[cardNumber].pop();
    cardFront.style.backgroundImage = `url(${cardImage})`;

    card.setAttribute("data-card", cardNumber);
    card.appendChild(cardBack); // Adiciona a div "card" como elemento filho de "game", retratada pelo CardList
    card.appendChild(cardFront); // Adiciona a div "back" como elemento filho de "card"
    cardList.appendChild(card); // Adiciona a div "front" como elemento filho de "card"

    card.addEventListener("click", flipCard);
  }
}

// Função para gerar imagens
async function generateImagePairs() {
  // Função assíncrona que faz requisições de imagens com o picsum
  const imagePairs = {}; // Objeto de pares de imagens
  for (let i = 0; i < cards.length; i++) {
    // For loop que percorre o número de cartas
    if (!imagePairs[cards[i]]) {
      // Analisa se a carta atual já contém um valor, valor é negado para a lógica prosseguir quando não tiver
      const id = Math.floor(Math.random() * 1000) + 1; // Randomiza o id
      const url = `https://picsum.photos/id/${id}/200/400`; // Pega o id conforme o id sorteado, foto tem 300x400
      imagePairs[cards[i]] = [url, url]; // Pega o número da carta no momento e atribui a url duplicada dentro da propriedade
    }
  }
  console.log(imagePairs);
  return imagePairs;
}

// Função para embaralhar as cartas
const shuffleCards = (cards) => {
  cards.sort(() => Math.random() - 0.5); // Essa estrutura randomiza se a carta deve ser alterada de posição ou não
};

// Função para virar as cartas
function flipCard() {
  if (flippedCards < 2 && !this.classList.contains("flip")) {
    flippedCards++;
    this.classList.add("flip");
    if (flippedCards === 1) {
      firstCard = this;
    } else {
      secondCard = this;
      attempts++;
      updateAttempts();
      checkMatch();
    }
  }
}

// Verifique se as cartas viradas são iguais
function checkMatch() {
  const isMatch =
    firstCard.getAttribute("data-card") ===
    secondCard.getAttribute("data-card");
  isMatch ? disableCards() : unflipCards();
}

// Desabilita as cartas viradas se forem iguais
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  if (document.querySelectorAll(".card:not(.flip)").length === 0) {
    congratsDiv.textContent = "Parabéns! Você ganhou!!";
    setTimeout(() =>{
      createCards()
      congratsDiv.textContent = "";
      attempts = 0;
      updateAttempts()
    }, 3000);
  }

  resetBoard();

}

// Desvira as cartas se não forem iguais
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

// Reinicia o tabuleiro
function resetBoard() {
  [flippedCards, firstCard, secondCard] = [0, null, null];
}

// Atualiza o número de tentativas
function updateAttempts() {
  const attemptsElement = document.querySelector(".attempts");
  attemptsElement.textContent = `Tentativas: ${attempts}`;
}

// Evento para mudança de seleção de imagem
document.querySelector(".imageSelect").addEventListener("change", function () {
  createCards();
});

// Inicialização
createCards();
