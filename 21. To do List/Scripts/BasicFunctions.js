// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções

// Função para salvar um novo "todo"
const saveTodo = (title, done = false, save = true) => {
    if (title === "") {
        return;
    } else {
        fetch("../Components/todoItem.html")
            .then((response) => response.text())
            .then((data) => {
                const tempContainer = document.createElement("div");
                tempContainer.innerHTML = data;

                const todoItem = tempContainer.querySelector(".todo");

                const titleElement = todoItem.querySelector("h3");
                titleElement.textContent = title;

                // Se o "todo" estiver marcado como "done", adiciona a classe correspondente
                if (done) {
                    todoItem.classList.add("done");
                }

                // Adicionar o "todo" ao DOM
                todoList.appendChild(todoItem);

                // Salvar no Local Storage se necessário
                if (save) {
                    saveTodoToLocalStorage({ title, done });
                }
            })
            .catch((error) => console.error("Error loading template:", error));

        todoInput.value = "";
        todoInput.focus();
    }
};

// Função para alternar os formulários (edição/adicionar)
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

// Função para atualizar um "todo" existente
const updateTodo = (newTitle) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = newTitle;
            updateTodoInLocalStorage(oldInputValue, newTitle);
        }
    });
};

// Função para obter "todos" do Local Storage
const getTodosFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};

// Função para salvar um "todo" no Local Storage
const saveTodoToLocalStorage = (todo) => {
    const todos = getTodosFromLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Função para remover um "todo" do Local Storage
const removeTodoFromLocalStorage = (todoTitle) => {
    const todos = getTodosFromLocalStorage();
    const filteredTodos = todos.filter((todo) => todo.title !== todoTitle);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

// Função para atualizar um "todo" no Local Storage
const updateTodoInLocalStorage = (oldTitle, newTitle) => {
    const todos = getTodosFromLocalStorage();
    todos.forEach((todo) => {
        if (todo.title === oldTitle) {
            todo.title = newTitle;
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Função para alternar o status de "concluído" de um "todo" no Local Storage
const toggleTodoDoneStatusInLocalStorage = (todoTitle) => {
    const todos = getTodosFromLocalStorage();
    todos.forEach((todo) => {
        if (todo.title === todoTitle) {
            todo.done = !todo.done;
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Função para carregar "todos" do Local Storage ao carregar a página
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.forEach((todo) => {
        saveTodo(todo.title, todo.done, false); // Carrega e adiciona ao DOM, sem salvar novamente
    });
};

// Carrega "todos" ao iniciar a página
loadTodos();

// Eventos

// Adicionar um novo "todo"
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = todoInput.value;
    if (inputValue) {
        saveTodo(inputValue);
    }
});

// Detecção de clique para funções de editar, concluir e remover "todos"
document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");
    let todoTitle;

    if (parentElement && parentElement.querySelector("h3")) {
        todoTitle = parentElement.querySelector("h3").innerText;
    }

    // Marcar "todo" como concluído
    if (targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done");
        const isDone = parentElement.classList.contains("done");
        toggleTodoDoneStatusInLocalStorage(todoTitle); // Salva a alternância do status de "done"
    }

    // Remover "todo"
    if (targetElement.classList.contains("remove-todo")) {
        parentElement.remove();
        removeTodoFromLocalStorage(todoTitle);
    }

    // Editar "todo"
    if (targetElement.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

// Cancelar edição
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

// Submeter edição
editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});
