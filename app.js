const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskTemplate = document.getElementById("task-template");
const taskCounter = document.getElementById("task-counter");
const emptyState = document.getElementById("empty-state");
const clearCompletedButton = document.getElementById("clear-completed");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskFragment = taskTemplate.content.cloneNode(true);
    const listItem = taskFragment.querySelector(".task");
    const checkbox = taskFragment.querySelector(".task__checkbox");
    const text = taskFragment.querySelector(".task__text");
    const deleteButton = taskFragment.querySelector(".task__delete");

    text.textContent = task.text;
    checkbox.checked = task.completed;

    if (task.completed) {
      listItem.classList.add("task--completed");
    }

    checkbox.addEventListener("change", () => toggleTask(task.id));
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(taskFragment);
  });

  updateUI();
}

function updateUI() {
  const count = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  taskCounter.textContent =
    count === 0
      ? "0 tarefas"
      : `${count} tarefa${count > 1 ? "s" : ""} (${completed} concluída${
          completed !== 1 ? "s" : ""
        })`;

  const hasTasks = count > 0;
  emptyState.hidden = hasTasks;
  clearCompletedButton.disabled = completed === 0;
}

function addTask(text) {
  const newTask = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
  };

  tasks = [newTask, ...tasks];
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = taskInput.value.trim();

  if (!value) {
    taskInput.focus();
    return;
  }

  addTask(value);
  taskInput.value = "";
  taskInput.focus();
});

clearCompletedButton.addEventListener("click", clearCompleted);

renderTasks();
