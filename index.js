require('./db-connect');

const express = require('express');
const todosRoutes = require('./routes/todos');

const app = express();

app.use('/api/todos', todosRoutes);

app.get('/', (req, res, next) => {
  res.send('Hello from Express!');
});

app.listen(3000, () => {
  console.log('Express up at 3000...');
});
