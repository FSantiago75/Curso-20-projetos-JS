const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

//Funções
const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        // Exibir todos inicialmente
        todo.style.display = "flex";

        // Ocultar aqueles que não correspondem à pesquisa
        if (!todoTitle.includes(search.toLowerCase())) {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filterValue) =>{
    const todos = document.querySelectorAll(".todo");
    switch(filterValue){
        case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));

      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    default:
      break;
  }
}

//Eventos
searchInput.addEventListener("keyup", (event) => {
    const search = event.target.value.trim(); // Remover espaços em branco extras
    getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (event) =>{
    event.preventDefault()
    searchInput.value=""
    searchInput.dispatchEvent(new Event("keyup") )
})

filterBtn.addEventListener("change", (e) =>{
    const filterValue = e.target.value

    filterTodos(filterValue)
})
