const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

// Fetch and display tasks on load
document.addEventListener("DOMContentLoaded", async () => {
  const todos = await fetchTodos();
  todos.forEach(addTodoToDOM);
});

// Add a new task
addTodoBtn.addEventListener("click", async () => {
  const task = todoInput.value.trim();
  if (task) {
    const newTodo = await addTodo(task);
    addTodoToDOM(newTodo);
    todoInput.value = "";
  }
});

// Add task to DOM
function addTodoToDOM(todo) {
  const li = document.createElement("li");
  li.textContent = todo.task;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", async () => {
    await deleteTodo(todo.id);
    li.remove();
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Fetch todos from the server
async function fetchTodos() {
  const response = await fetch("/api/todos");
  return response.json();
}

// Add a new todo via the server
async function addTodo(task) {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });
  return response.json();
}

// Delete a todo via the server
async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
}
