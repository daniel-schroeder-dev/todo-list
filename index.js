require('./db-connect');
require('./models/todo');

const express = require('express');
const morgan = require('morgan');
const todosRoutes = require('./routes/todos');

const Todo = require('mongoose').model('Todo');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(morgan('dev'));
app.use('/api/todos', todosRoutes);

app.get('/', (req, res, next) => {
  Todo.find()
    .then(todos => res.render('index', { todos }))
    .catch(console.error);
});

app.listen(3000, () => {
  console.log('Express up at 3000...');
  console.log('\n\n\n\n\n');
});
