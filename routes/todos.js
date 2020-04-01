const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

router.get('/', (req, res, next) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(console.error);
});

module.exports = router;