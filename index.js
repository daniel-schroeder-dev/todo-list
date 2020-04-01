require('./db-connect');

const express = require('express');
const morgan = require('morgan');
const todosRoutes = require('./routes/todos');

const app = express();


app.use(morgan('dev'));
app.use('/api/todos', todosRoutes);

app.get('/', (req, res, next) => {
  res.send('Hello from Express!');
});

app.listen(3000, () => {
  console.log('Express up at 3000...');
  console.log('\n\n\n\n\n');
});
