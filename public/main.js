const form = document.querySelector('.add-todo__form');
const addTodoInput = document.querySelector('.add-todo__input');
const todoList = document.querySelector('.todo-list');

form.addEventListener('submit', async e => {
  
  e.preventDefault();

  const todoName = addTodoInput.value;
  addTodoInput.value = '';

  await createTodoDB(todoName);

  todoList.append(createTodoDOMElement(todoName));

});

todoList.addEventListener('click', e => {

  if (e.target.classList.contains('todo-list__todo__remove-icon')) {
    console.log('remove');
  } else {

    const todoElement = e.target.tagName === 'A' ? e.target.parentElement : e.target;
    
    todoElement.classList.toggle('completed');

    const completed = todoElement.dataset.completed === 'true';

    updateTodoDB({ _id: todoElement.dataset.id, completed });

  }
});

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

function createTodoDOMElement(todoName) {
  
  const li = document.createElement('li');
  const todoLink = document.createElement('a');
  const removeIcon = document.createElement('a');
  
  li.classList.add('todo-list__todo');
  todoLink.classList.add('todo-list__todo__link');
  removeIcon.classList.add('todo-list__todo__remove-icon');

  todoLink.href = '#';
  removeIcon.href = '#';
  removeIcon.setAttribute('aria-label', 'remove-todo');

  todoLink.textContent = todoName;
  removeIcon.innerHTML = '&times;';

  li.append(todoLink);
  li.append(removeIcon);

  return li;
}

