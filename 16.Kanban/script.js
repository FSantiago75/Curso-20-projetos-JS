const tasks = document.querySelectorAll(".tasks li");
let draggedTask = null;

//drag and drop
tasks.forEach((task) => {
  task.addEventListener("dragstart", (event) => {
    draggedTask = task;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", task.innerHTML);
    task.classList.add("dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
    draggedTask = null;
  });
});

const columns = document.querySelectorAll(".tasks");

columns.forEach((column) => {
  column.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    column.classList.add("dragover");
  });
  column.addEventListener("dragleave", () => {
    column.classList.remove("dragover");
  });
  column.addEventListener("drop", (event) => {
    event.preventDefault();
    const task = document.createElement("li");
    task.innerHTML = event.dataTransfer.getData("text/html");
    task.setAttribute("draggable", true);
    task.addEventListener("dragstart", (event) => {
      draggedTask = task;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/html", task.innerHTML);
      task.classList.add("dragging");
    });
    column.appendChild(task);
    column.classList.remove("dragover");

    const previousColumn = draggedTask.parentNode;
    previousColumn.removeChild(draggedTask);
  });
});
//drag and drop

//create task
const addTaskForm = document.querySelector(".add-task-form");
const inputTitle = document.querySelector(".input-title");
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTaskText = inputTitle.value.trim();

  if (newTaskText != "") {
    const newTask = document.createElement("li");
    newTask.textContent = newTaskText;
    newTask.setAttribute("draggable", true);
    newTask.addEventListener("dragstart", (event) => {
      draggedTask = newTask;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/html", newTask.innerHTML);
      newTask.classList.add("dragging");
    });
    document.querySelector("#to-do").appendChild(newTask);
    inputTitle.value = "";
  }
});
//create task
