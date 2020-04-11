const mongoose = require('mongoose');

mongoose.set('debug', true);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGO_DB_URI, options)
  .catch(error => console.error(error));

mongoose.connection.on('error', error => {
  console.error(error);
});
