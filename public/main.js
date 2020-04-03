const form = document.querySelector('.add-task__form');
const addTaskInput = document.querySelector('.add-task__input');
const taskList = document.querySelector('.task-list');

form.addEventListener('submit', async e => {
  
  e.preventDefault();

  const taskName = addTaskInput.value;
  addTaskInput.value = '';

  await createTaskDB(taskName);

  taskList.append(createTaskDOMElement(taskName));

});

async function createTaskDB(taskName) {
  
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: taskName }),
  });
  
  const task = await response.json();

  return task;
}

function createTaskDOMElement(taskName) {
  
  const li = document.createElement('li');
  const taskLink = document.createElement('a');
  const removeIcon = document.createElement('a');
  
  li.classList.add('task-list__task');
  taskLink.classList.add('task-list__task__link');
  removeIcon.classList.add('task-list__task__remove-icon');

  taskLink.href = '/';
  removeIcon.setAttribute('aria-label', 'remove-task');

  taskLink.textContent = taskName;
  removeIcon.innerHTML = '&times;';

  li.append(taskLink);
  li.append(removeIcon);

  return li;
}

