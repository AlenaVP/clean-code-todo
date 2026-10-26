const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;

  const taskElement = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const taskElement = this.parentNode;
  const editInput = taskElement.querySelector('input[type="text"]');
  const label = taskElement.querySelector('label');
  const editButton = taskElement.querySelector('.edit');
  const isInEditMode = taskElement.classList.contains('editMode');

  if (isInEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskElement.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskElement = this.parentNode;
  taskElement.parentNode.removeChild(taskElement);
};

const moveTask = function (taskElement, targetList, checkboxChangeHandler) {
  targetList.appendChild(taskElement);
  bindTaskEvents(taskElement, checkboxChangeHandler);
};

const taskCompleted = function () {
  moveTask(this.parentNode, completedTasksHolder, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, incompleteTaskHolder, taskCompleted);
};

const bindTaskEvents = function (taskElement, checkboxChangeHandler) {
  const checkBox = taskElement.querySelector('input[type="checkbox"]');
  const editButton = taskElement.querySelector('.edit');
  const deleteButton = taskElement.querySelector('.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', checkboxChangeHandler);
};

addButton.addEventListener('click', addTask);

for (const taskElement of incompleteTaskHolder.children) {
  bindTaskEvents(taskElement, taskCompleted);
}

for (const taskElement of completedTasksHolder.children) {
  bindTaskEvents(taskElement, taskIncomplete);
}
