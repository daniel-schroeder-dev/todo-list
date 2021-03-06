const form = document.querySelector('.add-todo__form');
const addTodoInput = document.querySelector('.add-todo__input');
const todoList = document.querySelector('.todo-list');

form.addEventListener('submit', async e => {
  
  e.preventDefault();

  const todoName = addTodoInput.value;
  addTodoInput.value = '';

  const todo = await createTodoDB(todoName);

  todoList.append(createTodoDOMElement(todo));

});

todoList.addEventListener('click', e => {

  e.preventDefault();

  const todoElement = e.target.tagName === 'A' ? e.target.parentElement : e.target;

  if (e.target.classList.contains('todo-list__todo__remove-icon')) {
    removeTodo(todoElement);
  } else {
    toggleCompletedStatus(todoElement)    
  }

});

function removeTodo(todoElement) {
  todoElement.remove();
  removeTodoDB(todoElement.dataset.id);
}

async function removeTodoDB(id) {
  
  const response = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });
  
  const deletedTodo = await response.json();

  return deletedTodo;
}

function toggleCompletedStatus(todoElement) {
  todoElement.classList.toggle('completed');
  const completed = todoElement.dataset.completed === 'true';
  todoElement.dataset.completed = !completed;
  updateTodoDB({ _id: todoElement.dataset.id, completed });
}

async function updateTodoDB(todo) {
  
  const response = await fetch(`/api/todos/${todo._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed: !todo.completed }),
  });
  
  const updatedTodo = await response.json();

  return updatedTodo;
}

function createTodoDOMElement(todo) {
  
  const li = document.createElement('li');
  const todoLink = document.createElement('a');
  const removeIcon = document.createElement('a');
  
  li.classList.add('todo-list__todo');
  todoLink.classList.add('todo-list__todo__link');
  removeIcon.classList.add('todo-list__todo__remove-icon');

  todoLink.href = '';
  removeIcon.href = '';
  removeIcon.setAttribute('aria-label', 'remove-todo');

  todoLink.textContent = todo.name;
  removeIcon.innerHTML = '&times;';

  li.dataset.id = todo._id;
  li.dataset.completed = false;

  li.append(todoLink);
  li.append(removeIcon);

  return li;
}

async function createTodoDB(todoName) {
  
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: todoName }),
  });
  
  const todo = await response.json();

  return todo;
}
