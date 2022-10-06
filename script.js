// 初始變數
const listSection = document.querySelector("#lists");
const onHoldItems = document.querySelector("#on-hold-items");
const inProgressItems = document.querySelector("#inProgress-items");
const doneItems = document.querySelector("#done-items");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];
for (let todo of todos) {
  addItem(todo);
}

// variables
function holdContent(name) {
  return `
     <label for="todo" class="task on-hold">${name}</label>
     <i class="delete fa fa-lg fa-trash"></i>
    `;
}
function progressingContent(name) {
  return `<label for="todo" class="task in-progress">${name}</label>
      <span>
      <i class="fa fa-lg fa-arrow-up"></i>
      <i class="delete fa fa-lg fa-trash"></i>
      </span>`;
}
function doneContent(name) {
  return `
     <label for="todo" class="task done">${name}</label>
     <i class="delete fa fa-lg fa-trash"></i>
    `;
}

// add new item：
// 監聽：點擊Btn
addBtn.addEventListener("click", function (event) {
  const inputValue = input.value.trim();

  if (inputValue.length > 0) {
    addItem(inputValue);
  }
});
// 監聽："Enter"
document.addEventListener("keypress", (key) => {
  const inputValue = input.value.trim();
  if (event.key === "Enter") {
    if (inputValue.length > 0) {
      addItem(inputValue);
      input.value = "";
    }
  }
});

// Delete and check task
listSection.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;
  const doneItems = document.querySelector("#done-items");
  const inProgressItems = document.querySelector("#in-progress-items");

  //icon : delete task
  if (target.classList.contains("delete")) {
    if (parentElement.tagName === "SPAN") {
      parentElement.parentElement.remove();
    } else {
      parentElement.remove();
    }

    //move task: on hold -> in progress
  } else if (target.matches(".on-hold")) {
    parentElement.innerHTML = progressingContent(target.innerText);
    inProgressItems.appendChild(parentElement);

    //move task: in progress -> done
  } else if (target.matches(".in-progress")) {
    parentElement.innerHTML = doneContent(target.innerText);
    doneItems.appendChild(parentElement);

    //move task: in progress -> on hold
  } else if (
    target.matches(".fa-arrow-up")
    // &&target.previousElementSibling.matches(".in-progress")
  ) {
    const inProgressTask = parentElement.previousElementSibling.innerHTML;
    addItem(inProgressTask);
    parentElement.parentElement.remove(parentElement);

    //move task: done -> in progress
  } else if (target.matches(".done")) {
    parentElement.innerHTML = progressingContent(target.innerText);
    inProgressItems.appendChild(parentElement);
  }
});

// Function :add newItem
function addItem(text) {
  const onHoldItems = document.querySelector("#on-hold-items");
  const todoItem = document.createElement("li");
  todoItem.innerHTML = holdContent(text);
  onHoldItems.appendChild(todoItem);
}