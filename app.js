const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const taskElement = document.createElement('li');

  const completionCheckbox = document.createElement('input');
  const taskLabel = document.createElement('label');
  const taskEditInput = document.createElement('input');
  const editTaskButton = document.createElement('button');
  const deleteTaskButton = document.createElement('button');
  const deleteButtonIcon = document.createElement('img');

  taskLabel.innerText = taskText;
  taskLabel.className = 'task';

  completionCheckbox.type = 'checkbox';
  taskEditInput.type = 'text';
  taskEditInput.className = 'task';

  editTaskButton.innerText = 'Edit';
  editTaskButton.className = 'edit';

  deleteTaskButton.className = 'delete';
  deleteButtonIcon.src = './remove.svg';
  deleteTaskButton.appendChild(deleteButtonIcon);

  taskElement.append(completionCheckbox, taskLabel, taskEditInput, editTaskButton, deleteTaskButton);

  return taskElement;
};

const addTask = function () {
  if (!newTaskInput.value) return;

  const taskElement = createTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskElement = this.parentNode;
  const taskEditInput = taskElement.querySelector('input[type="text"]');
  const taskLabel = taskElement.querySelector('label');
  const editTaskButton = taskElement.querySelector('.edit');
  const isInEditMode = taskElement.classList.contains('editMode');

  if (isInEditMode) {
    taskLabel.innerText = taskEditInput.value;
    editTaskButton.innerText = 'Edit';
  } else {
    taskEditInput.value = taskLabel.innerText;
    editTaskButton.innerText = 'Save';
  }

  taskElement.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskElement = this.parentNode;
  taskElement.parentNode.removeChild(taskElement);
};

const moveTask = function (taskElement, targetList, onCompletionChange) {
  targetList.appendChild(taskElement);
  bindTaskEvents(taskElement, onCompletionChange);
};

const taskCompleted = function () {
  moveTask(this.parentNode, completedTasksList, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, incompleteTasksList, taskCompleted);
};

const bindTaskEvents = function (taskElement, onCompletionChange) {
  const completionCheckbox = taskElement.querySelector('input[type="checkbox"]');
  const editTaskButton = taskElement.querySelector('.edit');
  const deleteTaskButton = taskElement.querySelector('.delete');

  editTaskButton.addEventListener('click', editTask);
  deleteTaskButton.addEventListener('click', deleteTask);
  completionCheckbox.addEventListener('change', onCompletionChange);
};

addTaskButton.addEventListener('click', addTask);

for (const taskElement of incompleteTasksList.children) {
  bindTaskEvents(taskElement, taskCompleted);
}

for (const taskElement of completedTasksList.children) {
  bindTaskEvents(taskElement, taskIncomplete);
}
