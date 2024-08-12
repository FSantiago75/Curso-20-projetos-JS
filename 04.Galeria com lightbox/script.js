const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxDel = document.querySelector(".lightbox-del");
const fileInput = document.getElementById('arquivo');
const gallery = document.querySelector('.gallery');

// Função para abrir a imagem no lightbox
function openLightbox(event) {
    const imageUrl = event.currentTarget.querySelector(".gallery-image").getAttribute("data-src");
    lightboxImage.setAttribute("src", imageUrl);
    lightbox.style.display = "flex";
}

// Função para adicionar event listeners aos itens da galeria
function addGalleryItemListeners(item) {
    item.addEventListener("click", openLightbox);
}

// Adiciona event listeners às imagens existentes na galeria
document.querySelectorAll(".gallery-item").forEach(addGalleryItemListeners);

lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightboxDel.addEventListener("click", () => {
    const delSrc = lightboxImage.getAttribute("src");

    // Remover imagem da galeria
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item) => {
        const imgSrc = item.querySelector(".gallery-image").getAttribute("data-src");
        if (imgSrc === delSrc) {
            gallery.removeChild(item);
        }
    });

    // Limpar o lightbox
    lightboxImage.setAttribute('src', '');
    lightbox.style.display = 'none';
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        reader.onload = function(event) {
            const imageUrl = event.target.result;

            const newDiv = document.createElement('div');
            newDiv.classList.add("gallery-item");

            const newImage = document.createElement('img');
            newImage.classList.add("gallery-image");
            newImage.src = imageUrl;
            newImage.setAttribute('alt', "Imagem nova!");
            newImage.setAttribute('data-src', imageUrl); // Adicionar data-src para identificação

            // Adicionar a nova imagem à galeria
            newDiv.appendChild(newImage);
            gallery.appendChild(newDiv);

            // Adicionar event listeners ao novo item da galeria
            addGalleryItemListeners(newDiv);
        };

        // Lê o conteúdo do arquivo como uma URL de dados (base64)
        reader.readAsDataURL(file);
    }
});
