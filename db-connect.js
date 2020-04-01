const mongoose = require('mongoose');

mongoose.set('debug', true);

const url = 'mongodb://127.0.0.1:27017/todo-api';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(url, options)
  .catch(error => console.error(error));

mongoose.connection.on('error', error => {
  console.error(error);
});
