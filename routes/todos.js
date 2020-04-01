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
  Todo.create(req.body)
    .then(todo => res.status(201).json(todo))
    .catch(console.error);
});

router.get('/:id', (req, res, next) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(console.error);
});

router.put('/:id', jsonBodyParser, (req, res, next) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(todo => res.json(todo))
    .catch(console.error);
});

router.delete('/:id', (req, res, next) => {
  Todo.findOneAndRemove(req.params.id)
    .then(todo => res.json(todo))
    .catch(console.error);
});

module.exports = router;