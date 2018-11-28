var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://admin:wahyuais1234@ds115664.mlab.com:15664/todoapp'
}
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.PORT ? db.mlab : db.localhost ,{ useNewUrlParser: true });

module.exports = {
  mongoose
}
