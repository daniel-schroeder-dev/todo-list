const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('../models/todo');

const router = express.Router();
const jsonBodyParser = bodyParser.json();

router.get('/', (req, res, next) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(console.error);
});

router.post('/', jsonBodyParser, (req, res, next) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;