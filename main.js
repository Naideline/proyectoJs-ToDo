const todoInput = document.querySelector(".todo_input");
const todoButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const nombreTarea = document.getElementById("nombre_tarea");
const categoriesInput = document.getElementById("categoriesInput");

// Habilitar/deshabilitar el botón de "Añadir tarea" según los campos tengan un valor o no
nombreTarea.addEventListener("input", validarCampos);
categoriesInput.addEventListener("input", validarCampos);

function validarCampos() {
  if (nombreTarea.value !== "" && categoriesInput.value !== "") {
    todoButton.disabled = false;
  } else {
    todoButton.disabled = true;
  }
}

//event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//funciones
function addTodo(event) {
  event.preventDefault();
  //todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //todo LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo_item");
  todoDiv.appendChild(newTodo);

  // Nombre categoría
  const valueCategories = document.querySelector("#categoriesInput").value;
  const spanValue = document.createElement("span");
  spanValue.innerText = ` - ${valueCategories}`;
  newTodo.appendChild(spanValue);

  // Crear un elemento span para mostrar el icono de la categoría
  const categoryIcon = document.createElement("span");
  categoryIcon.classList.add("category-icon");

  // Obtener el valor de la categoría seleccionada
  const categoryValue = categoriesInput.value;

  // Asignar el código del icono correspondiente al elemento span
  if (categoryValue === "Personal") {
    categoryIcon.innerHTML = "&#xf007;"; // Icono de la casa
  } else if (categoryValue === "Work") {
    categoryIcon.innerHTML = "&#xf0b1;"; // Icono de maletín
  } else if (categoryValue === "Shopping") {
    categoryIcon.innerHTML = "&#xf07a;"; // Icono de bolsa de compras
  } else if (categoryValue === "Study") {
    categoryIcon.innerHTML = "&#xf19d;"; // Icono de graduado
  } else if (categoryValue === "House") {
    categoryIcon.innerHTML = "&#xf015;"; // Icono de llave
  }

  // Agregar el elemento span al elemento <li> de la tarea
  newTodo.appendChild(categoryIcon);

  // Tiempo transcurrido
  const now = new Date();
  const timeSpan = document.createElement("span");
  timeSpan.classList.add("time_span");
  timeSpan.innerText = getElapsedTime(now);
  newTodo.appendChild(timeSpan);

  newTodo.setAttribute("data-created", now);

  if (todoInput.value === "") {
    return null;
  }
  //check mark BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete_btn");
  todoDiv.appendChild(completedButton);
  //BOTON DE ELIMINAR BUTTON
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete_btn");
  todoDiv.appendChild(deleteButton);
  //AÑADIR A LISTA ACTUAL
  todoList.appendChild(todoDiv);
  //LIMPIAR EL INPUT
  todoInput.value = "";
}

function getElapsedTime(created) {
  const now = new Date();
  const diff = now - created;

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `     / ${seconds} seconds ago`;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) {
    return `    / ${minutes} minutes ago`;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  return `     / ${hours} hours ago`;
}

function updateElapsedTime() {
  const todos = document.querySelectorAll(".todo_item");
  todos.forEach((todo) => {
    const timeSpan = todo.querySelector(".time_span");
    const created = new Date(todo.getAttribute("data-created"));
    timeSpan.innerText = getElapsedTime(created);
  });
}
setInterval(updateElapsedTime, 60000);

//Elimiar & Comprobar
function deleteCheck(e) {
  const item = e.target;
  //ELIMINAR ITEM
  if (item.classList[0] === "delete_btn") {
    const todo = item.parentElement;
    //TRANSICION ANIMACION
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //ITEM COMPLETADO
  if (item.classList[0] === "complete_btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completedItem");
  }
}

//Eliminar las tareas completadas
const removeCompletedButton = document.querySelector(".remove_completed_btn");
removeCompletedButton.addEventListener("click", removeCompleted);

function removeCompleted() {
  const completedItems = document.querySelectorAll(".completedItem");
  completedItems.forEach((completedItem) => {
    completedItem.remove();
  });
}
