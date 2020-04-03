const express = require('express');
const bodyParser = require('body-parser');
const { getTodos, postTodo, getTodo, putTodo, deleteTodo } = require('../helpers/todo-route-handlers');

const jsonBodyParser = bodyParser.json();
const router = express.Router();

router.route('/')
  .get(getTodos)
  .post(jsonBodyParser, postTodo);

router.route('/:id')
  .get(getTodo)
  .put(jsonBodyParser, putTodo)
  .delete(deleteTodo);

module.exports = router;
