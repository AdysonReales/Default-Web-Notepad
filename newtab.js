document.addEventListener("DOMContentLoaded", () => {

  const noteArea = document.getElementById("note");

  const todoList = document.getElementById("todo-list");
  const addTodoButton = document.getElementById("add-todo");

  const modal = document.getElementById("todo-modal");

  const titleInput = document.getElementById("todo-title-input");
  const descriptionInput = document.getElementById("todo-description");

  const saveTodoButton = document.getElementById("save-todo");
  const cancelTodoButton = document.getElementById("cancel-todo");


  let todos = [];


  // ==========================================
  // LOAD SAVED DATA
  // ==========================================

  chrome.storage.local.get(
    ["userNote", "todos"],
    (result) => {

      // Load sticky note
      if (result.userNote) {
        noteArea.value = result.userNote;
      }

      // Load todo list
      if (result.todos) {
        todos = result.todos;
      }

      renderTodos();
    }
  );


  // ==========================================
  // STICKY NOTE AUTO SAVE
  // ==========================================

  noteArea.addEventListener("input", () => {

    chrome.storage.local.set({
      userNote: noteArea.value
    });

  });


  // ==========================================
  // OPEN ADD TODO MODAL
  // ==========================================

  addTodoButton.addEventListener("click", () => {

    modal.classList.add("show");

    titleInput.value = "";
    descriptionInput.value = "";

    titleInput.focus();

  });


  // ==========================================
  // CLOSE MODAL
  // ==========================================

  cancelTodoButton.addEventListener("click", () => {

    modal.classList.remove("show");

  });


  // Click outside modal
  modal.addEventListener("click", (event) => {

    if (event.target === modal) {
      modal.classList.remove("show");
    }

  });


  // ==========================================
  // ADD TODO
  // ==========================================

  saveTodoButton.addEventListener("click", () => {

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
      titleInput.focus();
      return;
    }


    const newTodo = {

      id: Date.now(),

      title: title,

      description: description,

      completed: false

    };


    todos.push(newTodo);

    saveTodos();

    renderTodos();

    modal.classList.remove("show");

  });


  // ==========================================
  // ENTER TO SAVE
  // ==========================================

  titleInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

      event.preventDefault();

      saveTodoButton.click();

    }

  });


  // ==========================================
  // SAVE TODOS
  // ==========================================

  function saveTodos() {

    chrome.storage.local.set({
      todos: todos
    });

  }


  // ==========================================
  // RENDER TODO LIST
  // ==========================================

  function renderTodos() {

    todoList.innerHTML = "";


    if (todos.length === 0) {

      todoList.innerHTML = `
        <div id="empty-todo">
          No tasks yet.<br>
          Click + to add one.
        </div>
      `;

      return;

    }


    todos.forEach((todo) => {

      const card = document.createElement("div");

      card.className = "todo-card";

      if (todo.completed) {
        card.classList.add("completed");
      }


      card.innerHTML = `

        <button class="delete-todo">
          ✕
        </button>

        <div class="todo-main">

          <input
            type="checkbox"
            class="todo-checkbox"
            ${todo.completed ? "checked" : ""}
          >

          <div class="todo-content">

            <div class="todo-title">
              ${escapeHTML(todo.title)}
            </div>

            ${
              todo.description
                ? `
                  <div class="todo-description">
                    ${escapeHTML(todo.description)}
                  </div>
                `
                : ""
            }

          </div>

        </div>
      `;


      // ========================================
      // CHECKBOX
      // ========================================

      const checkbox =
        card.querySelector(".todo-checkbox");


      checkbox.addEventListener("click", (event) => {

        event.stopPropagation();

        todo.completed = checkbox.checked;

        saveTodos();

        renderTodos();

      });


      // ========================================
      // DELETE
      // ========================================

      const deleteButton =
        card.querySelector(".delete-todo");


      deleteButton.addEventListener("click", (event) => {

        event.stopPropagation();

        todos = todos.filter(
          item => item.id !== todo.id
        );

        saveTodos();

        renderTodos();

      });


      todoList.appendChild(card);

    });

  }


  // ==========================================
  // PREVENT HTML INJECTION
  // ==========================================

  function escapeHTML(value) {

    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }

});