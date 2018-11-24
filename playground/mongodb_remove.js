const {ObjectID} = require('mongoose');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}    = require('./../server/models/users');


//Todo.findOneAndRemove
//Todo.findByIdAndRemove

 Todo.findByIdAndRemove('5bf8e24d7a08510ed2af456f').then( (todo) => {
   console.log(todo);
 })
