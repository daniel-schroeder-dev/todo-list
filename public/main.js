const form = document.querySelector('.add-task__form');
const addTaskInput = document.querySelector('.add-task__input');

form.addEventListener('submit', async e => {
  e.preventDefault();
  console.log(addTaskInput.value);
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: addTaskInput.value }),
  });
  const task = await response.json();
  console.log(task);
});

