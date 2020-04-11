if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  app.use(require('morgan')('dev'));
}

require('./db-connect');
require('./models/todo');

const express = require('express');
const todosRoutes = require('./routes/todos');

const Todo = require('mongoose').model('Todo');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/api/todos', todosRoutes);

app.get('/', (req, res, next) => {
  Todo.find()
    .then(todos => res.render('index', { todos }))
    .catch(console.error);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Express up at: ', PORT);
});
