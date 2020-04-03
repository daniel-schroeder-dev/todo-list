const Todo = require('../models/todo');

exports.getTodos = (req, res, next) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(console.error);
};

exports.postTodo = (req, res, next) => {
  Todo.create(req.body)
    .then(todo => res.status(201).json(todo))
    .catch(console.error);
};

exports.getTodo = (req, res, next) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(console.error);
};

exports.putTodo = (req, res, next) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(todo => res.json(todo))
    .catch(console.error);
};

exports.deleteTodo = (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(todo => res.json(todo))
    .catch(console.error);
};

module.exports = exports;
